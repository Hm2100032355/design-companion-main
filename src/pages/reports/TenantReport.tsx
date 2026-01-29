import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Users, UserPlus, UserMinus, TrendingUp, Download, Calendar, Clock, MapPin, Building2 } from "lucide-react";

export default function TenantReport() {
  const tenantTrend = [
    { month: "Aug", joined: 5, vacated: 2, total: 33 },
    { month: "Sep", joined: 4, vacated: 1, total: 36 },
    { month: "Oct", joined: 3, vacated: 2, total: 37 },
    { month: "Nov", joined: 2, vacated: 1, total: 38 },
    { month: "Dec", joined: 1, vacated: 3, total: 36 },
    { month: "Jan", joined: 2, vacated: 2, total: 36 }
  ];

  const occupationData = [
    { name: "IT Professional", value: 18, fill: "hsl(var(--primary))" },
    { name: "Student", value: 10, fill: "hsl(var(--chart-2))" },
    { name: "Business", value: 5, fill: "hsl(var(--chart-3))" },
    { name: "Other", value: 3, fill: "hsl(var(--chart-4))" }
  ];

  const stayDurationData = [
    { name: "< 3 months", value: 8, fill: "hsl(var(--chart-1))" },
    { name: "3-6 months", value: 12, fill: "hsl(var(--chart-2))" },
    { name: "6-12 months", value: 10, fill: "hsl(var(--chart-3))" },
    { name: "> 1 year", value: 6, fill: "hsl(var(--chart-4))" }
  ];

  const recentActivity = [
    { name: "Rahul Kumar", action: "Joined", room: "101", date: "2025-01-15", type: "join" },
    { name: "Priya Sharma", action: "Vacated", room: "205", date: "2025-01-10", type: "vacate" },
    { name: "Amit Singh", action: "Joined", room: "103", date: "2025-01-05", type: "join" },
    { name: "Suresh Reddy", action: "Room Changed", room: "102→201", date: "2025-01-03", type: "change" },
    { name: "Vikram Patel", action: "Vacated", room: "304", date: "2024-12-28", type: "vacate" }
  ];

  const stats = [
    { label: "Total Tenants", value: "36", icon: Users, color: "text-primary", change: "0" },
    { label: "Joined This Month", value: "2", icon: UserPlus, color: "text-green-600", change: "+1" },
    { label: "Vacated This Month", value: "2", icon: UserMinus, color: "text-orange-600", change: "-1" },
    { label: "Avg. Stay Duration", value: "6.5 mo", icon: Clock, color: "text-blue-600", change: "+0.5" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Tenant Report
          </h1>
          <p className="text-muted-foreground">Analyze tenant demographics and trends</p>
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
              <SelectItem value="q4-2024">Q4 2024</SelectItem>
              <SelectItem value="2024">Full Year 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
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
            <CardTitle className="text-lg">Tenant Movement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tenantTrend}>
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
                <Bar dataKey="joined" fill="hsl(var(--chart-2))" name="Joined" radius={[4, 4, 0, 0]} />
                <Bar dataKey="vacated" fill="hsl(var(--chart-4))" name="Vacated" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Tenant Occupation Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {occupationData.map((entry, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stay Duration */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Stay Duration Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stayDurationData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value} tenants</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(item.value / 36) * 100}%`,
                        backgroundColor: item.fill
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Tenant Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant Name</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.name}</TableCell>
                    <TableCell>
                      <Badge className={
                        activity.type === "join" ? "bg-green-100 text-green-700" :
                        activity.type === "vacate" ? "bg-red-100 text-red-700" :
                        "bg-blue-100 text-blue-700"
                      }>
                        {activity.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.room}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Floor-wise Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Floor 1</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "87%" }} />
                </div>
                <span className="text-sm font-medium">14 tenants</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Floor 2</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                </div>
                <span className="text-sm font-medium">12 tenants</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Floor 3</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "62%" }} />
                </div>
                <span className="text-sm font-medium">10 tenants</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Home State Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telangana</span>
              <Badge variant="secondary">12</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Andhra Pradesh</span>
              <Badge variant="secondary">10</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Maharashtra</span>
              <Badge variant="secondary">6</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Karnataka</span>
              <Badge variant="secondary">5</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Others</span>
              <Badge variant="secondary">3</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>👥 IT Professionals form the majority (50%) of tenants</p>
            <p>⏱️ Average stay duration is 6.5 months</p>
            <p>📈 Net tenant growth this month: 0 (2 joined, 2 vacated)</p>
            <p>🏠 Floor 1 has highest occupancy (87%)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
