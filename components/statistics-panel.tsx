"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, AlertTriangle, Clock, CheckCircle, MapPin } from "lucide-react"

interface Alert {
  id: string
  userId: string
  lat: number
  lng: number
  type: string
  nearestStation: string
  status: "New" | "Responding" | "Resolved"
  timestamp: string
}

interface StatisticsPanelProps {
  alerts: Alert[]
}

export default function StatisticsPanel({ alerts }: StatisticsPanelProps) {
  // Calculate statistics
  const totalAlerts = alerts.length
  const newAlerts = alerts.filter((alert) => alert.status === "New").length
  const respondingAlerts = alerts.filter((alert) => alert.status === "Responding").length
  const resolvedAlerts = alerts.filter((alert) => alert.status === "Resolved").length

  // Crime type breakdown
  const crimeTypes = alerts.reduce(
    (acc, alert) => {
      acc[alert.type] = (acc[alert.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const crimeTypeData = Object.entries(crimeTypes).map(([type, count]) => ({
    name: type,
    value: count,
  }))

  // Area-wise alert count (by police station)
  const areaData = alerts.reduce(
    (acc, alert) => {
      const station = alert.nearestStation.replace(" Police Station", "")
      acc[station] = (acc[station] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const areaChartData = Object.entries(areaData)
    .map(([area, count]) => ({
      area,
      alerts: count,
    }))
    .sort((a, b) => b.alerts - a.alerts)
    .slice(0, 8) // Top 8 areas

  // Hourly trend (simulated data for demo)
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const alertsInHour = alerts.filter((alert) => {
      const alertHour = new Date(alert.timestamp).getHours()
      return alertHour === hour
    }).length

    return {
      hour: `${hour.toString().padStart(2, "0")}:00`,
      alerts: alertsInHour,
    }
  })

  // Response time data (simulated)
  const responseTimeData = [
    { timeRange: "0-5 min", count: Math.floor(resolvedAlerts * 0.4) },
    { timeRange: "5-10 min", count: Math.floor(resolvedAlerts * 0.3) },
    { timeRange: "10-15 min", count: Math.floor(resolvedAlerts * 0.2) },
    { timeRange: "15+ min", count: Math.floor(resolvedAlerts * 0.1) },
  ]

  const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#f97316"]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-2xl font-bold">{totalAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-red-600">{newAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Responding</p>
                <p className="text-2xl font-bold text-amber-600">{respondingAlerts}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{resolvedAlerts}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Crime Type Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Crime Type Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={crimeTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {crimeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area-wise Alert Count */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Top Alert Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="alerts" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Alert Trend */}
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Alert Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" fontSize={12} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeRange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Most Common Alert</h4>
              <p className="text-blue-700">
                {crimeTypeData.length > 0 ? crimeTypeData.sort((a, b) => b.value - a.value)[0].name : "No data"}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Resolution Rate</h4>
              <p className="text-green-700">
                {totalAlerts > 0 ? Math.round((resolvedAlerts / totalAlerts) * 100) : 0}%
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-900">Hotspot Area</h4>
              <p className="text-amber-700">{areaChartData.length > 0 ? areaChartData[0].area : "No data"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
