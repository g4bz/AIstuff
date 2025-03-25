"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ParkingLotViewProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

// Mock data for parking bays and positions
const parkingData = [
  {
    id: "A1",
    positions: [
      { id: "A", occupied: true, vehicle: "TS123BC", company: "Tech Solutions Inc.", user: "John Smith" },
      { id: "B", occupied: false, vehicle: null, company: null, user: null },
    ],
  },
  {
    id: "A2",
    positions: [
      { id: "A", occupied: false, vehicle: null, company: null, user: null },
      { id: "B", occupied: false, vehicle: null, company: null, user: null },
    ],
  },
  {
    id: "A3",
    positions: [
      { id: "A", occupied: false, vehicle: null, company: null, user: null },
      { id: "B", occupied: false, vehicle: null, company: null, user: null },
    ],
  },
  {
    id: "B1",
    positions: [
      { id: "A", occupied: true, vehicle: "GL789EF", company: "Global Logistics Corp.", user: "Jane Doe" },
      { id: "B", occupied: false, vehicle: null, company: null, user: null },
    ],
  },
  {
    id: "B2",
    positions: [
      { id: "A", occupied: false, vehicle: null, company: null, user: null },
      { id: "B", occupied: false, vehicle: null, company: null, user: null },
    ],
  },
  {
    id: "B3",
    positions: [
      { id: "A", occupied: false, vehicle: null, company: null, user: null },
      { id: "B", occupied: false, vehicle: null, company: null, user: null },
    ],
  },
]

export function ParkingLotView({ userRole }: ParkingLotViewProps) {
  const [selectedBay, setSelectedBay] = useState<any>(null)
  const [selectedPosition, setSelectedPosition] = useState<any>(null)
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false)
  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false)

  const handleBayClick = (bay: any, position: any) => {
    setSelectedBay(bay)
    setSelectedPosition(position)
  }

  const handleCheckIn = () => {
    // Logic for check-in would go here
    setIsCheckInDialogOpen(false)
  }

  const handleCheckOut = () => {
    // Logic for check-out would go here
    setIsCheckOutDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Parking Lot View</CardTitle>
          <CardDescription>
            View and manage parking spots in the facility. Each bay has two positions (A: Lower, B: Upper).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parkingData.map((bay) => (
              <Card key={bay.id} className="overflow-hidden">
                <CardHeader className="bg-muted p-3">
                  <CardTitle className="text-lg">Bay {bay.id}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {bay.positions.map((position) => (
                    <div
                      key={position.id}
                      className={`p-4 border-t flex justify-between items-center cursor-pointer hover:bg-muted/50 ${position.occupied ? "bg-muted/20" : ""}`}
                      onClick={() => handleBayClick(bay, position)}
                    >
                      <div>
                        <div className="font-medium">
                          Position {position.id} {position.id === "A" ? "(Lower)" : "(Upper)"}
                        </div>
                        {position.occupied ? (
                          <div className="text-sm text-muted-foreground">
                            {position.vehicle} - {position.company}
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">Vacant</div>
                        )}
                      </div>
                      <Badge variant={position.occupied ? "default" : "outline"}>
                        {position.occupied ? "Occupied" : "Vacant"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedBay && selectedPosition && (
        <Card>
          <CardHeader>
            <CardTitle>
              Selected Spot: Bay {selectedBay.id}, Position {selectedPosition.id}
            </CardTitle>
            <CardDescription>
              {selectedPosition.occupied
                ? `Currently occupied by vehicle ${selectedPosition.vehicle}`
                : "This spot is currently vacant"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end gap-2">
            {selectedPosition.occupied ? (
              <Dialog open={isCheckOutDialogOpen} onOpenChange={setIsCheckOutDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Check Out Vehicle</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Check Out Vehicle</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to check out vehicle {selectedPosition.vehicle} from Bay {selectedBay.id},
                      Position {selectedPosition.id}?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCheckOutDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCheckOut}>Confirm Check Out</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Check In Vehicle</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Check In Vehicle</DialogTitle>
                    <DialogDescription>
                      Assign a vehicle to Bay {selectedBay.id}, Position {selectedPosition.id}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="vehicle">Select Vehicle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TS456CD">TS456CD - Toyota Corolla</SelectItem>
                          <SelectItem value="GL012HI">GL012HI - Honda Civic</SelectItem>
                          <SelectItem value="IH345JK">IH345JK - Ford Focus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input id="notes" placeholder="Add any additional notes" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCheckIn}>Check In</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

