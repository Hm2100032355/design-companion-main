import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";
import { IndianRupee, TrendingUp, AlertCircle, CheckCircle, Download, Calendar, Users, CreditCard } from "lucide-react";

export default function RentReport() {
  const monthlyCollection = [
    { month: "Aug", collected: 165000, pending: 15000, target: 180000 },
    { month: "Sep", collected: 172000, pending: 8000, target: 180000 },
    { month: "Oct", collected: 178000, pending: 2000, target: 180000 },
    { month: "Nov", collected: 175000, pending: 5000, target: 180000 },
    { month: "Dec", collected: 168000, pending: 12000, target: 180000 },
    { month: "Jan", collected: 172000, pending: 8000, target: 180000 }
  ];

  const paymentModeData = [
    { name: "UPI", value: 45, fill: "hsl(var(--primary))" },
    { name: "Bank Transfer", value: 30, fill: "hsl(var(--chart-2))" },
    { name: "Cash", value: 15, fill: "hsl(var(--chart-3))" },
    { name: "Card", value: 10, fill: "hsl(var(--chart-4))" }
  ];

  const tenantPayments = [
    { name: "Rahul Kumar", room: "101", rent: 8000, status: "paid", date: "2025-01-05", mode: "UPI" },
    { name: "Suresh Reddy", room: "102", rent: 8000, status: "paid", date: "2025-01-03", mode: "Bank Transfer" },
    { name: "Amit Singh", room: "103", rent: 7500, status: "pending", date: null, mode: null },
    { name: "Priya Sharma", room: "201", rent: 9000, status: "paid", date: "2025-01-01", mode: "UPI" },
    { name: "Vikram Patel", room: "202", rent: 8500, status: "partial", date: "2025-01-10", mode: "Cash" },
    { name: "Deepak Verma", room: "203", rent: 8000, status: "overdue", date: null, mode: null }
  ];

  const stats = [
    { label: "This Month Collection", value: "₹1,72,000", icon: IndianRupee, color: "text-green-600", change: "+5%" },
    { label: "Pending Amount", value: "₹8,000", icon: AlertCircle, color: "text-orange-600", change: "-3%" },
    { label: "Collection Rate", value: "95.5%", icon: TrendingUp, color: "text-blue-600", change: "+2%" },
    { label: "Total Tenants Paid", value: "34/36", icon: Users, color: "text-primary", change: "" }
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      partial: "bg-blue-100 text-blue-700",
      overdue: "bg-red-100 text-red-700"
    };
    return <Badge className={styles[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <IndianRupee className="h-6 w-6 text-primary" />
            Rent Collection Report
          </h1>
          <p className="text-muted-foreground">Analyze rent collection and payment trends</p>
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
              {stat.change && (
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Collection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyCollection}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                />
                <Legend />
                <Bar dataKey="collected" fill="hsl(var(--primary))" name="Collected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(var(--chart-4))" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Payment Mode Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {paymentModeData.map((entry, index) => (
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

      {/* Tenant Payment Table */}
      <Card className="border-0 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Tenant-wise Payment Status</CardTitle>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead className="text-right">Rent Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Payment Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenantPayments.map((tenant, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.room}</TableCell>
                  <TableCell className="text-right font-medium">₹{tenant.rent.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                  <TableCell>{tenant.date || "-"}</TableCell>
                  <TableCell>{tenant.mode || "-"}</TableCell>
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
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Expected</span>
              <span className="font-medium">₹1,80,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Collected</span>
              <span className="font-medium text-green-600">₹1,72,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-medium text-orange-600">₹8,000</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium">Collection Rate</span>
              <span className="font-bold text-primary">95.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Payment Modes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">UPI Payments</span>
              <Badge variant="secondary">45%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Bank Transfer</span>
              <Badge variant="secondary">30%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cash</span>
              <Badge variant="secondary">15%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Card</span>
              <Badge variant="secondary">10%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-orange-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Pending Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <div>
                <p className="font-medium text-sm">Amit Singh</p>
                <p className="text-xs text-muted-foreground">Room 103</p>
              </div>
              <Button size="sm" variant="outline">Send Reminder</Button>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded-lg">
              <div>
                <p className="font-medium text-sm">Deepak Verma</p>
                <p className="text-xs text-muted-foreground">Room 203 - Overdue</p>
              </div>
              <Button size="sm" variant="outline">Send Reminder</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
