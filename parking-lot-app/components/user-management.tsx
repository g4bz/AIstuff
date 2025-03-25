"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"

interface UserManagementProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  company: string
  isActive: boolean
  isAvailable: boolean
}

export function UserManagement({ userRole }: UserManagementProps) {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    company: "",
  })

  useEffect(() => {
    // Fetch users from Supabase
    const fetchUsers = async () => {
      setLoading(true)
      try {
        // Build query based on user role
        let query = supabase.from('users').select('*')
        
        if (userRole === "company_admin") {
          query = query.eq('company', 'Tech Solutions Inc.')
        }
        
        const { data, error } = await query
        
        if (error) {
          console.error("Error fetching users:", error)
          return
        }
        
        setUsers(data || [])
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [userRole])

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    if (searchTerm === "") return true

    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddUser = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          first_name: newUser.firstName,
          last_name: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
          company: userRole === "super_admin" ? newUser.company : "Tech Solutions Inc.",
          is_active: true,
          is_available: true
        }])
        .select()

      if (error) {
        console.error("Error adding user:", error)
        return
      }

      // Add the new user to the state
      if (data && data.length > 0) {
        setUsers([...users, {
          id: data[0].id,
          firstName: data[0].first_name,
          lastName: data[0].last_name,
          email: data[0].email,
          role: data[0].role,
          company: data[0].company,
          isActive: data[0].is_active,
          isAvailable: data[0].is_available
        }])
      }
    } catch (error) {
      console.error("Error adding user:", error)
    }

    // Reset form and close dialog
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      company: "",
    })
    setIsAddUserDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewUser({ ...newUser, [id]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewUser({ ...newUser, [name]: value })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              {userRole === "super_admin" ? "Manage all users across all companies" : "Manage users for your company"}
            </CardDescription>
          </div>
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Enter the details of the user you want to add.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="e.g., John" 
                      value={newUser.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="e.g., Smith" 
                      value={newUser.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="e.g., john.smith@example.com" 
                    value={newUser.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRole === "super_admin" && <SelectItem value="Super Administrator">Super Administrator</SelectItem>}
                      <SelectItem value="Company Administrator">Company Administrator</SelectItem>
                      <SelectItem value="Regular User">Regular User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {userRole === "super_admin" && (
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Select onValueChange={(value) => handleSelectChange("company", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tech Solutions Inc.">Tech Solutions Inc.</SelectItem>
                        <SelectItem value="Global Logistics Corp.">Global Logistics Corp.</SelectItem>
                        <SelectItem value="Innovate Hub">Innovate Hub</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  {userRole === "super_admin" && <TableHead>Company</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={userRole === "super_admin" ? 7 : 6} className="text-center py-10">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={userRole === "super_admin" ? 7 : 6} className="text-center py-10">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      {userRole === "super_admin" && <TableCell>{user.company}</TableCell>}
                      <TableCell>
                        <Badge variant={user.isActive ? "default" : "secondary"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isAvailable ? "default" : "outline"}
                          className={user.isAvailable ? "bg-green-500 hover:bg-green-600 text-white" : ""}
                        >
                          {user.isAvailable ? "Available" : "Assigned"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuItem>
                              {user.isActive ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

