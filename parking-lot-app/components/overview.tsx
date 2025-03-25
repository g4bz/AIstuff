import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, Building2, ParkingSquare } from "lucide-react"

interface OverviewProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

export function Overview({ userRole }: OverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {userRole === "super_admin" ? "24" : userRole === "company_admin" ? "8" : "2"}
          </div>
          <p className="text-xs text-muted-foreground">
            {userRole === "super_admin"
              ? "Across all companies"
              : userRole === "company_admin"
                ? "In your company"
                : "Registered to you"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Parking Occupancy</CardTitle>
          <ParkingSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42%</div>
          <p className="text-xs text-muted-foreground">5 of 12 spots occupied</p>
        </CardContent>
      </Card>
      {userRole !== "regular_user" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userRole === "super_admin" ? "18" : "6"}</div>
            <p className="text-xs text-muted-foreground">
              {userRole === "super_admin" ? "Across all companies" : "In your company"}
            </p>
          </CardContent>
        </Card>
      )}
      {userRole === "super_admin" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">All active</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

