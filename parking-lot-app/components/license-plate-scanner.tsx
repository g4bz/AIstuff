"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

// Mock vehicle data for scanning
const registeredVehicles = [
  {
    licensePlate: "TS123BC",
    make: "Toyota",
    model: "Camry",
    color: "Blue",
    owner: "John Smith",
    company: "Tech Solutions Inc.",
  },
  {
    licensePlate: "GL789EF",
    make: "Honda",
    model: "Civic",
    color: "Red",
    owner: "Jane Doe",
    company: "Global Logistics Corp.",
  },
  {
    licensePlate: "TS456CD",
    make: "Toyota",
    model: "Corolla",
    color: "Silver",
    owner: "Sarah Johnson",
    company: "Tech Solutions Inc.",
  },
]

export function LicensePlateScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [manualInput, setManualInput] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startScanning = () => {
    setIsScanning(true)
    // In a real app, this would activate the camera and start OCR processing
    // For this prototype, we'll simulate scanning after a delay
    setTimeout(() => {
      // Randomly select a vehicle from our mock data
      const randomVehicle = registeredVehicles[Math.floor(Math.random() * registeredVehicles.length)]
      setScanResult(randomVehicle)
      setIsScanning(false)
    }, 2000)
  }

  const checkInVehicle = () => {
    // In a real app, this would call an API to check in the vehicle
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    setScanResult(null)
  }

  const handleManualSearch = () => {
    const vehicle = registeredVehicles.find((v) => v.licensePlate.toLowerCase() === manualInput.toLowerCase())
    setScanResult(vehicle || { error: "Vehicle not found" })
    setManualInput("")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>License Plate Scanner</CardTitle>
        <CardDescription>Scan license plates to automatically check in/out vehicles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSuccess && (
          <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-100">
            <Check className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Vehicle has been checked in successfully.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
              {isScanning ? (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-12 border-2 border-primary animate-pulse rounded-md"></div>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white font-medium bg-black/50 py-1">
                    Scanning...
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Camera preview</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={startScanning} disabled={isScanning} className="flex-1">
                <Camera className="mr-2 h-4 w-4" />
                {isScanning ? "Scanning..." : "Scan License Plate"}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Manual Entry</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manual License Plate Entry</DialogTitle>
                    <DialogDescription>Enter the license plate number manually</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="license-plate">License Plate</Label>
                      <Input
                        id="license-plate"
                        value={manualInput}
                        onChange={(e) => setManualInput(e.target.value)}
                        placeholder="e.g., TS123BC"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleManualSearch}>Search</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Scan Result</h3>
            {scanResult ? (
              scanResult.error ? (
                <div className="p-4 border rounded-md bg-destructive/10 text-destructive">
                  <p>{scanResult.error}</p>
                </div>
              ) : (
                <div className="p-4 border rounded-md space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-xl">{scanResult.licensePlate}</h4>
                    <Badge>{scanResult.company}</Badge>
                  </div>
                  <p>
                    {scanResult.make} {scanResult.model}, {scanResult.color}
                  </p>
                  <p className="text-sm text-muted-foreground">Owner: {scanResult.owner}</p>
                  <Button onClick={checkInVehicle} className="w-full">
                    <Check className="mr-2 h-4 w-4" />
                    Check In Vehicle
                  </Button>
                </div>
              )
            ) : (
              <div className="p-4 border rounded-md bg-muted flex items-center justify-center h-[200px]">
                <p className="text-muted-foreground">No vehicle scanned yet</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

