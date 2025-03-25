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

interface VehicleManagementProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

// Mock data for vehicles
const vehiclesData = [
  {
    id: 1,
    licensePlate: "TS123BC",
    make: "Toyota",
    model: "Camry",
    color: "Blue",
    year: 2020,
    company: "Tech Solutions Inc.",
    user: "John Smith",
    status: "Parked",
  },
  {
    id: 2,
    licensePlate: "TS456CD",
    make: "Toyota",
    model: "Corolla",
    color: "Silver",
    year: 2019,
    company: "Tech Solutions Inc.",
    user: "Sarah Johnson",
    status: "Not Parked",
  },
  {
    id: 3,
    licensePlate: "GL789EF",
    make: "Honda",
    model: "Civic",
    color: "Red",
    year: 2021,
    company: "Global Logistics Corp.",
    user: "Jane Doe",
    status: "Parked",
  },
  {
    id: 4,
    licensePlate: "GL012HI",
    make: "Honda",
    model: "Accord",
    color: "Black",
    year: 2022,
    company: "Global Logistics Corp.",
    user: "Michael Brown",
    status: "Not Parked",
  },
  {
    id: 5,
    licensePlate: "IH345JK",
    make: "Ford",
    model: "Focus",
    color: "White",
    year: 2018,
    company: "Innovate Hub",
    user: "David Wilson",
    status: "Not Parked",
  },
  {
    id: 6,
    licensePlate: "IH678LM",
    make: "Ford",
    model: "Fusion",
    color: "Gray",
    year: 2020,
    company: "Innovate Hub",
    user: "Emily Davis",
    status: "Not Parked",
  },
]

export function VehicleManagement({ userRole }: VehicleManagementProps) {
  const [isAddVehicleDialogOpen, setIsAddVehicleDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter vehicles based on user role and search term
  const filteredVehicles = vehiclesData.filter((vehicle) => {
    // Filter by user role
    if (userRole === "company_admin" && vehicle.company !== "Tech Solutions Inc.") return false
    if (userRole === "regular_user" && vehicle.user !== "John Smith") return false

    // Filter by search term
    if (searchTerm === "") return true

    return (
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.user.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleAddVehicle = () => {
    // Logic for adding a vehicle would go here
    setIsAddVehicleDialogOpen(false)
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
                    <Input id="licensePlate" placeholder="e.g., ABC123" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" placeholder="e.g., 2022" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="e.g., Toyota" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g., Camry" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="e.g., Blue" />
                </div>
                {(userRole === "super_admin" || userRole === "company_admin") && (
                  <div className="grid gap-2">
                    <Label htmlFor="user">Assign to User</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="michael">Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
                {filteredVehicles.map((vehicle) => (
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
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

