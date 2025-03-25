"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

// Mock data for companies
const companiesData = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    createdAt: "2023-01-15",
    updatedAt: "2023-12-10",
    isActive: true,
    userCount: 8,
    vehicleCount: 12,
  },
  {
    id: 2,
    name: "Global Logistics Corp.",
    createdAt: "2023-02-20",
    updatedAt: "2023-11-05",
    isActive: true,
    userCount: 6,
    vehicleCount: 8,
  },
  {
    id: 3,
    name: "Innovate Hub",
    createdAt: "2023-03-10",
    updatedAt: "2023-10-22",
    isActive: true,
    userCount: 4,
    vehicleCount: 4,
  },
]

export function CompanyManagement() {
  const [isAddCompanyDialogOpen, setIsAddCompanyDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter companies based on search term
  const filteredCompanies = companiesData.filter((company) => {
    if (searchTerm === "") return true

    return company.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleAddCompany = () => {
    // Logic for adding a company would go here
    setIsAddCompanyDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Company Management</CardTitle>
            <CardDescription>Manage all companies in the parking facility</CardDescription>
          </div>
          <Dialog open={isAddCompanyDialogOpen} onOpenChange={setIsAddCompanyDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
                <DialogDescription>Enter the details of the company you want to add.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="e.g., Acme Corporation" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCompanyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCompany}>Add Company</Button>
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
                placeholder="Search companies..."
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
                  <TableHead>Company Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Vehicles</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.createdAt}</TableCell>
                    <TableCell>{company.updatedAt}</TableCell>
                    <TableCell>
                      <Badge variant={company.isActive ? "default" : "secondary"}>
                        {company.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{company.userCount}</TableCell>
                    <TableCell>{company.vehicleCount}</TableCell>
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
                          <DropdownMenuItem>Edit Company</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>{company.isActive ? "Deactivate" : "Activate"}</DropdownMenuItem>
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

