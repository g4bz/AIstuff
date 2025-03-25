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

interface VehicleManagementProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

interface Vehicle {
  id: number
  licensePlate: string
  make: string
  model: string
  color: string
  year: number
  company: string
  user: string
  status: string
}

export function VehicleManagement({ userRole }: VehicleManagementProps) {
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [newVehicle, setNewVehicle] = useState({
    licensePlate: "",
    make: "",
    model: "",
    color: "",
    year: new Date().getFullYear(),
    company: "",
    user: "",
  })

  useEffect(() => {
    // Fetch vehicles from Supabase
    const fetchVehicles = async () => {
      setLoading(true)
      try {
        // Build query based on user role
        let query = supabase.from('vehicles').select('*')
        
        if (userRole === "company_admin") {
          query = query.eq('company', 'Tech Solutions Inc.')
        } else if (userRole === "regular_user") {
          query = query.eq('user', 'John Smith')
        }
        
        const { data, error } = await query
        
        if (error) {
          console.error("Error fetching vehicles:", error)
          return
        }
        
        setVehicles(data || [])
      } catch (error) {
        console.error("Error fetching vehicles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [userRole])

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (searchTerm === "") return true

    return (
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.user.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .insert([{
          license_plate: newVehicle.licensePlate,
          make: newVehicle.make,
          model: newVehicle.model,
          color: newVehicle.color,
          year: newVehicle.year,
          company: userRole === "super_admin" ? newVehicle.company : "Tech Solutions Inc.",
          user: (userRole === "super_admin" || userRole === "company_admin") ? newVehicle.user : "John Smith",
          status: "Not Parked"
        }])
        .select()

      if (error) {
        console.error("Error adding vehicle:", error)
        return
      }

      // Add the new vehicle to the state
      if (data && data.length > 0) {
        setVehicles([...vehicles, {
          id: data[0].id,
          licensePlate: data[0].license_plate,
          make: data[0].make,
          model: data[0].model,
          color: data[0].color,
          year: data[0].year,
          company: data[0].company,
          user: data[0].user,
          status: data[0].status
        }])
      }
    } catch (error) {
      console.error("Error adding vehicle:", error)
    }

    // Reset form and close dialog
    setNewVehicle({
      licensePlate: "",
      make: "",
      model: "",
      color: "",
      year: new Date().getFullYear(),
      company: "",
      user: "",
    })
    setIsAddVehicleDialogOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewVehicle({ ...newVehicle, [id]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewVehicle({ ...newVehicle, [name]: value })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Vehicle Management</CardTitle>
            <CardDescription>
              {userRole === "super_admin"
                ? "Manage all vehicles across all companies"
                : userRole === "company_admin"
                  ? "Manage vehicles for your company"
                  : "Manage your registered vehicles"}
            </CardDescription>
          </div>
          <Dialog open={isAddVehicleDialogOpen} onOpenChange={setIsAddVehicleDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>Enter the details of the vehicle you want to register.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input 
                      id="licensePlate" 
                      placeholder="e.g., ABC123" 
                      value={newVehicle.licensePlate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input 
                      id="year" 
                      type="number" 
                      placeholder="e.g., 2022" 
                      value={newVehicle.year}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="make">Make</Label>
                    <Input 
                      id="make" 
                      placeholder="e.g., Toyota" 
                      value={newVehicle.make}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Model</Label>
                    <Input 
                      id="model" 
                      placeholder="e.g., Camry" 
                      value={newVehicle.model}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Input 
                    id="color" 
                    placeholder="e.g., Blue" 
                    value={newVehicle.color}
                    onChange={handleInputChange}
                  />
                </div>
                {(userRole === "super_admin" || userRole === "company_admin") && (
                  <div className="grid gap-2">
                    <Label htmlFor="user">Assign to User</Label>
                    <Select onValueChange={(value) => handleSelectChange("user", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="John Smith">John Smith</SelectItem>
                        <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
                <Button variant="outline" onClick={() => setIsAddVehicleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
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
                placeholder="Search vehicles..."
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
                  <TableHead>License Plate</TableHead>
                  <TableHead>Make/Model</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Year</TableHead>
                  {userRole !== "regular_user" && <TableHead>User</TableHead>}
                  {userRole === "super_admin" && <TableHead>Company</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={userRole === "super_admin" ? 8 : userRole === "company_admin" ? 7 : 6} className="text-center py-10">
                      Loading vehicles...
                    </TableCell>
                  </TableRow>
                ) : filteredVehicles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={userRole === "super_admin" ? 8 : userRole === "company_admin" ? 7 : 6} className="text-center py-10">
                      No vehicles found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.licensePlate}</TableCell>
                      <TableCell>
                        {vehicle.make} {vehicle.model}
                      </TableCell>
                      <TableCell>{vehicle.color}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      {userRole !== "regular_user" && <TableCell>{vehicle.user}</TableCell>}
                      {userRole === "super_admin" && <TableCell>{vehicle.company}</TableCell>}
                      <TableCell>
                        <Badge variant={vehicle.status === "Parked" ? "default" : "outline"}>{vehicle.status}</Badge>
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
                            <DropdownMenuItem>Edit Vehicle</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Deactivate</DropdownMenuItem>
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

