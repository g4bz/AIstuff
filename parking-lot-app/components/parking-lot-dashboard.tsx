"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ParkingLotView } from "@/components/parking-lot-view"
import { VehicleManagement } from "@/components/vehicle-management"
import { UserManagement } from "@/components/user-management"
import { CompanyManagement } from "@/components/company-management"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Overview } from "@/components/overview"
import { LicensePlateScanner } from "@/components/license-plate-scanner"
import { Reports } from "@/components/reports"
import { DashboardAnalytics } from "@/components/dashboard-analytics"

export default function ParkingLotDashboard() {
  const [userRole, setUserRole] = useState<"super_admin" | "company_admin" | "regular_user">("super_admin")

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as any)}
              >
                <option value="super_admin">Super Administrator</option>
                <option value="company_admin">Company Administrator</option>
                <option value="regular_user">Regular User</option>
              </select>
              <span className="text-sm text-muted-foreground">Role Simulation</span>
            </div>
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="parking">Parking Lot</TabsTrigger>
            <TabsTrigger value="scanner">License Scanner</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            {userRole !== "regular_user" && <TabsTrigger value="users">Users</TabsTrigger>}
            {userRole === "super_admin" && <TabsTrigger value="companies">Companies</TabsTrigger>}
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Overview userRole={userRole} />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <DashboardAnalytics userRole={userRole} />
          </TabsContent>
          <TabsContent value="parking" className="space-y-4">
            <ParkingLotView userRole={userRole} />
          </TabsContent>
          <TabsContent value="scanner" className="space-y-4">
            <LicensePlateScanner />
          </TabsContent>
          <TabsContent value="vehicles" className="space-y-4">
            <VehicleManagement userRole={userRole} />
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Reports userRole={userRole} />
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <UserManagement userRole={userRole} />
          </TabsContent>
          <TabsContent value="companies" className="space-y-4">
            <CompanyManagement userRole={userRole} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

