import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, Calendar, IndianRupee, Users, BedDouble, Wrench, TrendingUp, TrendingDown, CheckCircle, AlertCircle } from "lucide-react";

export default function MonthlySummary() {
  const revenueData = [
    { week: "Week 1", collected: 45000, target: 45000 },
    { week: "Week 2", collected: 62000, target: 45000 },
    { week: "Week 3", collected: 38000, target: 45000 },
    { week: "Week 4", collected: 27000, target: 45000 }
  ];

  const metricsComparison = [
    { metric: "Occupancy Rate", current: 75, previous: 72, unit: "%" },
    { metric: "Collection Rate", current: 95.5, previous: 93, unit: "%" },
    { metric: "Complaint Resolution", current: 75, previous: 80, unit: "%" },
    { metric: "Avg Stay Duration", current: 6.5, previous: 6, unit: " mo" }
  ];

  const keyHighlights = [
    { label: "Total Revenue", value: "₹1,72,000", icon: IndianRupee, color: "text-green-600", trend: "+5%", positive: true },
    { label: "Occupancy", value: "75%", icon: BedDouble, color: "text-blue-600", trend: "+3%", positive: true },
    { label: "Active Tenants", value: "36", icon: Users, color: "text-primary", trend: "0", positive: true },
    { label: "Complaints", value: "8", icon: Wrench, color: "text-orange-600", trend: "-4", positive: true }
  ];

  const categoryBreakdown = [
    { name: "Rent Collection", value: 172000, percentage: 88 },
    { name: "Advance Deposits", value: 15000, percentage: 8 },
    { name: "Other Income", value: 8000, percentage: 4 }
  ];

  const performanceMetrics = [
    { category: "Rent", icon: IndianRupee, status: "good", value: "95.5%", label: "Collection Rate" },
    { category: "Occupancy", icon: BedDouble, status: "good", value: "75%", label: "Bed Occupancy" },
    { category: "Complaints", icon: Wrench, status: "warning", value: "8", label: "Total Issues" },
    { category: "Tenants", icon: Users, status: "good", value: "36", label: "Active" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Monthly Summary
          </h1>
          <p className="text-muted-foreground">Complete performance overview for January 2025</p>
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
            Download Report
          </Button>
          <Button>
            Share Report
          </Button>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {keyHighlights.map((item) => (
          <Card key={item.label} className="border-0 shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${item.positive ? "text-green-600" : "text-red-600"}`}>
                {item.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {item.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Revenue Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
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
                <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Month-over-Month Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {metricsComparison.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {item.previous}{item.unit} → 
                      </span>
                      <span className="font-bold">
                        {item.current}{item.unit}
                      </span>
                      {item.current >= item.previous ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-muted-foreground/30 rounded-full" 
                          style={{ width: `${item.previous}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Previous</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${item.current}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Current</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Dashboard */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Performance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.category} className="text-center p-4 rounded-lg bg-muted/50">
                <div className={`inline-flex p-3 rounded-full mb-3 ${
                  metric.status === "good" ? "bg-green-100 text-green-600" : 
                  metric.status === "warning" ? "bg-yellow-100 text-yellow-600" : 
                  "bg-red-100 text-red-600"
                }`}>
                  <metric.icon className="h-6 w-6" />
                </div>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <Badge className={`mt-2 ${
                  metric.status === "good" ? "bg-green-100 text-green-700" : 
                  metric.status === "warning" ? "bg-yellow-100 text-yellow-700" : 
                  "bg-red-100 text-red-700"
                }`}>
                  {metric.status === "good" ? "On Track" : metric.status === "warning" ? "Needs Attention" : "Critical"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryBreakdown.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">₹{item.value.toLocaleString()}</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
            <div className="pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total Revenue</span>
                <span>₹1,95,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">95.5% Rent Collection</p>
                <p className="text-xs text-muted-foreground">Above 90% target</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">11 hrs Avg Resolution</p>
                <p className="text-xs text-muted-foreground">5 hrs faster than last month</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Zero Tenant Disputes</p>
                <p className="text-xs text-muted-foreground">Smooth operations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Floor 3 Occupancy Low</p>
                <p className="text-xs text-muted-foreground">63% vs 75% target</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">2 Pending Payments</p>
                <p className="text-xs text-muted-foreground">Follow up required</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Plumbing Issues</p>
                <p className="text-xs text-muted-foreground">28% of all complaints</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Items */}
      <Card className="border-0 shadow-card bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Recommended Actions for Next Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="font-medium">🎯 Increase Floor 3 Occupancy</p>
              <p className="text-sm text-muted-foreground mt-1">Run promotional offers for vacant beds</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-medium">🔧 Preventive Maintenance</p>
              <p className="text-sm text-muted-foreground mt-1">Schedule plumbing inspection</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-medium">💰 Early Rent Reminders</p>
              <p className="text-sm text-muted-foreground mt-1">Send reminders 5 days before due date</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-medium">⭐ Tenant Feedback</p>
              <p className="text-sm text-muted-foreground mt-1">Collect monthly satisfaction surveys</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
