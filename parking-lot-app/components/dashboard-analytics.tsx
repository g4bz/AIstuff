"use client"

import { useState, useEffect } from "react"
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
import { supabase } from "@/lib/supabase"

interface DashboardAnalyticsProps {
  userRole: "super_admin" | "company_admin" | "regular_user"
}

interface WeeklyTrend {
  name: string
  value: number
}

interface RecurrentCars {
  name: string
  value: number
}

interface AverageStay {
  hour: string
  duration: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function DashboardAnalytics({ userRole }: DashboardAnalyticsProps) {
  const [weeklyTrendData, setWeeklyTrendData] = useState<WeeklyTrend[]>([])
  const [recurrentCarsData, setRecurrentCarsData] = useState<RecurrentCars[]>([])
  const [averageStayData, setAverageStayData] = useState<AverageStay[]>([])
  const [loading, setLoading] = useState(true)
  const [todayTraffic, setTodayTraffic] = useState(0)
  const [trafficChange, setTrafficChange] = useState(0)
  const [averageStayTime, setAverageStayTime] = useState(0)
  const [stayTimeChange, setStayTimeChange] = useState(0)
  const [recurrentPercentage, setRecurrentPercentage] = useState(0)
  const [recurrentChange, setRecurrentChange] = useState(0)
  const [frequentVisitors, setFrequentVisitors] = useState(0)

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true)
      try {
        // Weekly trend data
        const { data: weeklyData, error: weeklyError } = await supabase
          .from('weekly_trends')
          .select('*')
          
        if (weeklyError) {
          console.error("Error fetching weekly trend data:", weeklyError)
          // Fall back to mock data if there's an error
          setWeeklyTrendData([
            { name: "Week 1", value: 120 },
            { name: "Week 2", value: 132 },
            { name: "Week 3", value: 125 },
            { name: "Week 4", value: 140 },
          ])
        } else {
          setWeeklyTrendData(weeklyData || [])
        }

        // Recurrent cars data
        const { data: recurrentData, error: recurrentError } = await supabase
          .from('recurrent_cars')
          .select('*')
          
        if (recurrentError) {
          console.error("Error fetching recurrent cars data:", recurrentError)
          // Fall back to mock data if there's an error
          setRecurrentCarsData([
            { name: "Daily", value: 35 },
            { name: "2-3 times/week", value: 45 },
            { name: "Weekly", value: 20 },
            { name: "Occasional", value: 30 },
          ])
        } else {
          setRecurrentCarsData(recurrentData || [])
        }

        // Average stay data
        const { data: stayData, error: stayError } = await supabase
          .from('average_stay')
          .select('*')
          
        if (stayError) {
          console.error("Error fetching average stay data:", stayError)
          // Fall back to mock data if there's an error
          setAverageStayData([
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
          ])
        } else {
          setAverageStayData(stayData || [])
        }

        // Today's statistics
        const { data: statsData, error: statsError } = await supabase
          .from('daily_stats')
          .select('*')
          .order('date', { ascending: false })
          .limit(2)
          
        if (statsError) {
          console.error("Error fetching daily stats:", statsError)
          setTodayTraffic(24)
          setTrafficChange(8)
          setAverageStayTime(5.8)
          setStayTimeChange(-3)
          setRecurrentPercentage(80)
          setRecurrentChange(5)
          setFrequentVisitors(12)
        } else if (statsData && statsData.length > 0) {
          setTodayTraffic(statsData[0].traffic || 0)
          
          if (statsData.length > 1) {
            const yesterdayTraffic = statsData[1].traffic || 0
            const changePercent = yesterdayTraffic > 0 
              ? ((statsData[0].traffic - yesterdayTraffic) / yesterdayTraffic) * 100 
              : 0
            setTrafficChange(parseFloat(changePercent.toFixed(1)))
          }
          
          setAverageStayTime(statsData[0].average_stay || 0)
          setStayTimeChange(statsData[0].stay_change || 0)
          setRecurrentPercentage(statsData[0].recurrent_percentage || 0)
          setRecurrentChange(statsData[0].recurrent_change || 0)
          setFrequentVisitors(statsData[0].frequent_visitors || 0)
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [userRole])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Traffic</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTraffic}</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">vs yesterday</span>
              <Badge variant="outline" className={`${trafficChange >= 0 ? 'text-green-500 bg-green-50 dark:bg-green-950' : 'text-red-500 bg-red-50 dark:bg-red-950'}`}>
                {trafficChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {trafficChange >= 0 ? '+' : ''}{trafficChange}%
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
            <div className="text-2xl font-bold">{averageStayTime} hrs</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">vs last week</span>
              <Badge variant="outline" className={`${stayTimeChange >= 0 ? 'text-green-500 bg-green-50 dark:bg-green-950' : 'text-red-500 bg-red-50 dark:bg-red-950'}`}>
                {stayTimeChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {stayTimeChange >= 0 ? '+' : ''}{stayTimeChange}%
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
            <div className="text-2xl font-bold">{recurrentPercentage}%</div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">of total traffic</span>
              <Badge variant="outline" className={`${recurrentChange >= 0 ? 'text-green-500 bg-green-50 dark:bg-green-950' : 'text-red-500 bg-red-50 dark:bg-red-950'}`}>
                {recurrentChange >= 0 ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                )}
                {recurrentChange >= 0 ? '+' : ''}{recurrentChange}%
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
            <div className="text-2xl font-bold">{frequentVisitors}</div>
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
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading data...</p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recurrent Cars</CardTitle>
            <CardDescription>Frequency of vehicle visits</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p>Loading data...</p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Stay Duration by Arrival Time</CardTitle>
          <CardDescription>How long vehicles stay based on when they arrive</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading data...</p>
            </div>
          ) : (
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

