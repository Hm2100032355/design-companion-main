import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Building2, BedDouble, Users, TrendingUp, Download, Calendar, Filter, Home } from "lucide-react";

export default function OccupancyReport() {
  const monthlyData = [
    { month: "Aug", occupancy: 68, beds: 32 },
    { month: "Sep", occupancy: 72, beds: 34 },
    { month: "Oct", occupancy: 78, beds: 37 },
    { month: "Nov", occupancy: 82, beds: 39 },
    { month: "Dec", occupancy: 75, beds: 36 },
    { month: "Jan", occupancy: 75, beds: 36 }
  ];

  const sharingTypeData = [
    { name: "Single", value: 8, fill: "hsl(var(--primary))" },
    { name: "Double", value: 16, fill: "hsl(var(--chart-2))" },
    { name: "Triple", value: 9, fill: "hsl(var(--chart-3))" },
    { name: "Four", value: 3, fill: "hsl(var(--chart-4))" }
  ];

  const floorWiseData = [
    { floor: "Floor 1", total: 16, occupied: 14, vacant: 2, rate: 88 },
    { floor: "Floor 2", total: 16, occupied: 12, vacant: 4, rate: 75 },
    { floor: "Floor 3", total: 16, occupied: 10, vacant: 6, rate: 63 }
  ];

  const stats = [
    { label: "Total Beds", value: "48", icon: BedDouble, color: "text-primary", change: "+0" },
    { label: "Occupied Beds", value: "36", icon: Users, color: "text-green-600", change: "+2" },
    { label: "Vacant Beds", value: "12", icon: Home, color: "text-orange-600", change: "-2" },
    { label: "Occupancy Rate", value: "75%", icon: TrendingUp, color: "text-blue-600", change: "+3%" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Occupancy Report
          </h1>
          <p className="text-muted-foreground">Analyze bed occupancy and vacancy trends</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="jan-2025">
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan-2025">January 2025</SelectItem>
              <SelectItem value="dec-2024">December 2024</SelectItem>
              <SelectItem value="nov-2024">November 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {stat.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Occupancy %"
                  dot={{ fill: "hsl(var(--primary))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="beds" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Occupied Beds"
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Occupancy by Sharing Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sharingTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {sharingTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Floor-wise Table */}
      <Card className="border-0 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Floor-wise Occupancy</CardTitle>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Floor</TableHead>
                <TableHead className="text-center">Total Beds</TableHead>
                <TableHead className="text-center">Occupied</TableHead>
                <TableHead className="text-center">Vacant</TableHead>
                <TableHead className="text-center">Occupancy Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {floorWiseData.map((floor) => (
                <TableRow key={floor.floor}>
                  <TableCell className="font-medium">{floor.floor}</TableCell>
                  <TableCell className="text-center">{floor.total}</TableCell>
                  <TableCell className="text-center font-medium text-green-600">{floor.occupied}</TableCell>
                  <TableCell className="text-center font-medium text-orange-600">{floor.vacant}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${floor.rate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{floor.rate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={floor.rate >= 80 ? "bg-green-100 text-green-700" : 
                                floor.rate >= 60 ? "bg-yellow-100 text-yellow-700" : 
                                "bg-red-100 text-red-700"}
                    >
                      {floor.rate >= 80 ? "High" : floor.rate >= 60 ? "Medium" : "Low"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold bg-muted/50">
                <TableCell>Total</TableCell>
                <TableCell className="text-center">48</TableCell>
                <TableCell className="text-center text-green-600">36</TableCell>
                <TableCell className="text-center text-orange-600">12</TableCell>
                <TableCell className="text-center">75%</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Quick Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm">Highest Occupancy</span>
              <span className="font-medium">Floor 1 (88%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm">Lowest Occupancy</span>
              <span className="font-medium">Floor 3 (63%)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm">Most Popular</span>
              <span className="font-medium">Double Sharing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Vacancy Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Available Now</span>
                  <span className="text-sm font-medium">12 beds</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Reserved</span>
                  <span className="text-sm font-medium">3 beds</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Under Maintenance</span>
                  <span className="text-sm font-medium">2 beds</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "17%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              📈 Floor 3 has low occupancy. Consider promotional offers.
            </p>
            <p className="text-sm text-muted-foreground">
              🛏️ Double sharing rooms are in high demand. Add more if possible.
            </p>
            <p className="text-sm text-muted-foreground">
              ⚡ Current trend shows stable growth in occupancy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
