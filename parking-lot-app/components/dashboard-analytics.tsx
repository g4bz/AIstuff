"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Clock, Car, ArrowUpRight, ArrowDownRight, Users } from "lucide-react"

interface DashboardAnalyticsProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

// Mock data for dashboard analytics
const weeklyTrendData = [
  { name: "Week 1", value: 120 },
  { name: "Week 2", value: 132 },
  { name: "Week 3", value: 125 },
  { name: "Week 4", value: 140 },
]

const recurrentCarsData = [
  { name: "Daily", value: 35 },
  { name: "2-3 times/week", value: 45 },
  { name: "Weekly", value: 20 },
  { name: "Occasional", value: 30 },
]

const averageStayData = [
  { hour: "8 AM", duration: 7.2 },
  { hour: "9 AM", duration: 6.8 },
  { hour: "10 AM", duration: 5.5 },
  { hour: "11 AM", duration: 4.2 },
  { hour: "12 PM", duration: 3.5 },
  { hour: "1 PM", duration: 4.8 },
  { hour: "2 PM", duration: 5.2 },
  { hour: "3 PM", duration: 5.8 },
  { hour: "4 PM", duration: 6.5 },
  { hour: "5 PM", duration: 7.0 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function DashboardAnalytics({ userRole }: DashboardAnalyticsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Traffic</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">vs yesterday</span>
              <Badge variant="outline" className="text-green-500 bg-green-50 dark:bg-green-950">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +8%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stay Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.8 hrs</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">vs last week</span>
              <Badge variant="outline" className="text-red-500 bg-red-50 dark:bg-red-950">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                -3%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recurrent Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">of total traffic</span>
              <Badge variant="outline" className="text-green-500 bg-green-50 dark:bg-green-950">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +5%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frequent Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Users visiting 4+ days/week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
            <CardDescription>Number of vehicles per week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={{
                value: {
                  label: "Vehicles",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Vehicles"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurrent Cars</CardTitle>
            <CardDescription>Frequency of vehicle visits</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={recurrentCarsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {recurrentCarsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} vehicles`, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Stay Duration by Arrival Time</CardTitle>
          <CardDescription>How long vehicles stay based on when they arrive</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={{
              duration: {
                label: "Hours",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={averageStayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="duration" fill="var(--color-duration)" name="Hours" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

