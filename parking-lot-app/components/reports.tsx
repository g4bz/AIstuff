"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ReportsProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

// Mock data for reports
const dailyTrafficData = [
  { day: "Monday", count: 42 },
  { day: "Tuesday", count: 38 },
  { day: "Wednesday", count: 45 },
  { day: "Thursday", count: 40 },
  { day: "Friday", count: 35 },
  { day: "Saturday", count: 18 },
  { day: "Sunday", count: 12 },
]

const hourlyTrafficData = [
  { hour: "6 AM", count: 5 },
  { hour: "7 AM", count: 12 },
  { hour: "8 AM", count: 25 },
  { hour: "9 AM", count: 18 },
  { hour: "10 AM", count: 8 },
  { hour: "11 AM", count: 5 },
  { hour: "12 PM", count: 10 },
  { hour: "1 PM", count: 12 },
  { hour: "2 PM", count: 8 },
  { hour: "3 PM", count: 5 },
  { hour: "4 PM", count: 15 },
  { hour: "5 PM", count: 22 },
  { hour: "6 PM", count: 18 },
  { hour: "7 PM", count: 10 },
  { hour: "8 PM", count: 5 },
]

const companyUsageData = [
  { name: "Tech Solutions Inc.", value: 45 },
  { name: "Global Logistics Corp.", value: 30 },
  { name: "Innovate Hub", value: 25 },
]

const frequentUsersData = [
  { name: "John Smith", visits: 22, company: "Tech Solutions Inc." },
  { name: "Jane Doe", visits: 18, company: "Global Logistics Corp." },
  { name: "Sarah Johnson", visits: 15, company: "Tech Solutions Inc." },
  { name: "Michael Brown", visits: 12, company: "Global Logistics Corp." },
  { name: "David Wilson", visits: 10, company: "Innovate Hub" },
]

const stayDurationData = [
  { duration: "< 1 hour", count: 15 },
  { duration: "1-2 hours", count: 25 },
  { duration: "2-4 hours", count: 30 },
  { duration: "4-6 hours", count: 45 },
  { duration: "6-8 hours", count: 60 },
  { duration: "> 8 hours", count: 35 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function Reports({ userRole }: ReportsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Parking Reports</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="date-range">Date Range:</Label>
          <Select defaultValue="last30days">
            <SelectTrigger id="date-range" className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="duration">Stay Duration</TabsTrigger>
          <TabsTrigger value="frequent">Frequent Users</TabsTrigger>
          {userRole === "super_admin" && <TabsTrigger value="company">Company Usage</TabsTrigger>}
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Traffic</CardTitle>
                <CardDescription>Number of vehicles per day of the week</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    count: {
                      label: "Vehicle Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" name="Vehicles" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Traffic</CardTitle>
                <CardDescription>Number of vehicles by hour of day</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer
                  config={{
                    count: {
                      label: "Vehicle Count",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="count" stroke="var(--color-count)" name="Vehicles" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="duration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stay Duration</CardTitle>
              <CardDescription>How long vehicles typically stay in the parking lot</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  count: {
                    label: "Vehicle Count",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stayDurationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="duration" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" name="Vehicles" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Frequent Users</CardTitle>
              <CardDescription>Users who visit the office most frequently</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  visits: {
                    label: "Visits",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={frequentUsersData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="visits" fill="var(--color-visits)" name="Visits">
                      {frequentUsersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === "super_admin" && (
          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Usage</CardTitle>
                <CardDescription>Parking usage distribution by company</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={companyUsageData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {companyUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} vehicles`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

