import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { AlertTriangle, CheckCircle, Clock, Wrench, Download, Calendar, TrendingUp, Star } from "lucide-react";

export default function ComplaintReport() {
  const monthlyComplaints = [
    { month: "Aug", open: 3, resolved: 8, total: 11 },
    { month: "Sep", open: 2, resolved: 6, total: 8 },
    { month: "Oct", open: 4, resolved: 10, total: 14 },
    { month: "Nov", open: 1, resolved: 5, total: 6 },
    { month: "Dec", open: 5, resolved: 7, total: 12 },
    { month: "Jan", open: 2, resolved: 6, total: 8 }
  ];

  const categoryData = [
    { name: "Plumbing", value: 28, fill: "hsl(var(--primary))" },
    { name: "Electrical", value: 22, fill: "hsl(var(--chart-2))" },
    { name: "Wi-Fi/Internet", value: 18, fill: "hsl(var(--chart-3))" },
    { name: "Housekeeping", value: 15, fill: "hsl(var(--chart-4))" },
    { name: "AC/Cooling", value: 12, fill: "hsl(var(--chart-5))" },
    { name: "Other", value: 5, fill: "hsl(var(--muted-foreground))" }
  ];

  const resolutionTimeData = [
    { month: "Aug", avgHours: 18 },
    { month: "Sep", avgHours: 14 },
    { month: "Oct", avgHours: 12 },
    { month: "Nov", avgHours: 10 },
    { month: "Dec", avgHours: 16 },
    { month: "Jan", avgHours: 11 }
  ];

  const recentComplaints = [
    { id: "C-1025", title: "Water leakage in bathroom", room: "102", category: "Plumbing", status: "resolved", time: "8 hrs", rating: 5 },
    { id: "C-1024", title: "Wi-Fi not working", room: "201", category: "Wi-Fi", status: "in-progress", time: "4 hrs", rating: null },
    { id: "C-1023", title: "AC not cooling", room: "305", category: "AC/Cooling", status: "open", time: "-", rating: null },
    { id: "C-1022", title: "Light not working", room: "103", category: "Electrical", status: "resolved", time: "2 hrs", rating: 4 },
    { id: "C-1021", title: "Room cleaning needed", room: "204", category: "Housekeeping", status: "resolved", time: "3 hrs", rating: 5 }
  ];

  const stats = [
    { label: "Total Complaints", value: "8", icon: AlertTriangle, color: "text-orange-600", subtext: "This month" },
    { label: "Resolved", value: "6", icon: CheckCircle, color: "text-green-600", subtext: "75%" },
    { label: "In Progress", value: "1", icon: Clock, color: "text-blue-600", subtext: "" },
    { label: "Avg Resolution", value: "11 hrs", icon: Wrench, color: "text-primary", subtext: "-5 hrs from last month" }
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: "bg-yellow-100 text-yellow-700",
      "in-progress": "bg-blue-100 text-blue-700",
      resolved: "bg-green-100 text-green-700"
    };
    return <Badge className={styles[status]}>{status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            Complaint Report
          </h1>
          <p className="text-muted-foreground">Analyze complaints and resolution metrics</p>
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
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                {stat.subtext && <p className="text-xs text-muted-foreground">{stat.subtext}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Complaint Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyComplaints}>
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
                <Bar dataKey="resolved" fill="hsl(var(--chart-2))" name="Resolved" radius={[4, 4, 0, 0]} />
                <Bar dataKey="open" fill="hsl(var(--chart-4))" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Complaints by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
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

      {/* Resolution Time Trend */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Average Resolution Time Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={resolutionTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value: number) => [`${value} hours`, 'Avg Resolution Time']}
              />
              <Line 
                type="monotone" 
                dataKey="avgHours" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Complaints Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Resolution Time</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.id}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{complaint.title}</TableCell>
                  <TableCell>{complaint.room}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{complaint.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                  <TableCell>{complaint.time}</TableCell>
                  <TableCell>
                    {complaint.rating ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{complaint.rating}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">75%</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }} />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                6 of 8 complaints resolved
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Tenant Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold">4.6</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on 42 ratings</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Top Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Plumbing</span>
              <Badge>28%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Electrical</span>
              <Badge variant="secondary">22%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Wi-Fi</span>
              <Badge variant="secondary">18%</Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              💡 Consider preventive maintenance for plumbing issues
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
