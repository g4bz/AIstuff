"use client"

import { useState } from "react"
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

interface UserManagementProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

// Mock data for users
const usersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@techsolutions.com",
    role: "Regular User",
    company: "Tech Solutions Inc.",
    isActive: true,
    isAvailable: false,
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@techsolutions.com",
    role: "Regular User",
    company: "Tech Solutions Inc.",
    isActive: true,
    isAvailable: true,
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@globallogistics.com",
    role: "Company Administrator",
    company: "Global Logistics Corp.",
    isActive: true,
    isAvailable: false,
  },
  {
    id: 4,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@globallogistics.com",
    role: "Regular User",
    company: "Global Logistics Corp.",
    isActive: true,
    isAvailable: false,
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@innovatehub.com",
    role: "Company Administrator",
    company: "Innovate Hub",
    isActive: true,
    isAvailable: false,
  },
  {
    id: 6,
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@innovatehub.com",
    role: "Regular User",
    company: "Innovate Hub",
    isActive: false,
    isAvailable: true,
  },
]

export function UserManagement({ userRole }: UserManagementProps) {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter users based on user role and search term
  const filteredUsers = usersData.filter((user) => {
    // Filter by user role
    if (userRole === "company_admin" && user.company !== "Tech Solutions Inc.") return false

    // Filter by search term
    if (searchTerm === "") return true

    return (
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddUser = () => {
    // Logic for adding a user would go here
    setIsAddUserDialogOpen(false)
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
                    <Input id="firstName" placeholder="e.g., John" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="e.g., Smith" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="e.g., john.smith@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRole === "super_admin" && <SelectItem value="super_admin">Super Administrator</SelectItem>}
                      <SelectItem value="company_admin">Company Administrator</SelectItem>
                      <SelectItem value="regular_user">Regular User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {userRole === "super_admin" && (
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tech Solutions Inc.</SelectItem>
                        <SelectItem value="global">Global Logistics Corp.</SelectItem>
                        <SelectItem value="innovate">Innovate Hub</SelectItem>
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
                {filteredUsers.map((user) => (
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
                        variant={user.isAvailable ? "success" : "outline"}
                        className={user.isAvailable ? "bg-green-500 hover:bg-green-600" : ""}
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
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>{user.isActive ? "Deactivate" : "Activate"}</DropdownMenuItem>
                          <DropdownMenuItem>
                            {user.isAvailable ? "Mark as Assigned" : "Mark as Available"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

