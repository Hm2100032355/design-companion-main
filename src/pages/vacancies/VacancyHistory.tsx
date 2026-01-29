import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Search, TrendingUp, TrendingDown } from "lucide-react";

const historyData = [
  { date: "2025-01-20", room: "101", action: "Vacated", tenant: "Rahul Kumar", sharingType: "2-Sharing", bedNo: "A" },
  { date: "2025-01-19", room: "203", action: "Occupied", tenant: "Suresh Reddy", sharingType: "Single", bedNo: "A" },
  { date: "2025-01-18", room: "301", action: "Vacated", tenant: "Amit Sharma", sharingType: "3-Sharing", bedNo: "B" },
  { date: "2025-01-17", room: "202", action: "Occupied", tenant: "Priya Singh", sharingType: "4-Sharing", bedNo: "C" },
  { date: "2025-01-15", room: "102", action: "Reserved", tenant: "Vikram Joshi", sharingType: "3-Sharing", bedNo: "A" },
  { date: "2025-01-14", room: "201", action: "Vacated", tenant: "Kiran Patel", sharingType: "2-Sharing", bedNo: "B" },
  { date: "2025-01-12", room: "301", action: "Occupied", tenant: "Neha Gupta", sharingType: "3-Sharing", bedNo: "A" },
  { date: "2025-01-10", room: "101", action: "Maintenance", tenant: "-", sharingType: "2-Sharing", bedNo: "B" },
];

const monthlyStats = [
  { month: "January 2025", occupied: 8, vacated: 4, netChange: 4, occupancyRate: 78 },
  { month: "December 2024", occupied: 6, vacated: 5, netChange: 1, occupancyRate: 74 },
  { month: "November 2024", occupied: 10, vacated: 3, netChange: 7, occupancyRate: 73 },
  { month: "October 2024", occupied: 5, vacated: 7, netChange: -2, occupancyRate: 66 },
];

const VacancyHistory = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Vacancy History</h1>
          <p className="text-muted-foreground">View historical vacancy data and trends</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {monthlyStats.slice(0, 4).map((stat, index) => (
          <Card key={index} className="border-0 shadow-card">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">{stat.month}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.occupancyRate}%</p>
                  <p className="text-xs text-muted-foreground">Occupancy</p>
                </div>
                <div className={`flex items-center gap-1 ${stat.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.netChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span className="font-medium">{stat.netChange >= 0 ? '+' : ''}{stat.netChange}</span>
                </div>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+{stat.occupied} in</span>
                <span className="text-red-600">-{stat.vacated} out</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>From Date</Label>
              <div className="relative">
                <Input type="date" />
              </div>
            </div>
            <div>
              <Label>To Date</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Room</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Rooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="101">Room 101</SelectItem>
                  <SelectItem value="102">Room 102</SelectItem>
                  <SelectItem value="201">Room 201</SelectItem>
                  <SelectItem value="202">Room 202</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Action Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="vacated">Vacated</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Vacancy Change Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Room No.</TableHead>
                <TableHead>Bed</TableHead>
                <TableHead>Sharing Type</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Tenant Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(record.date).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </div>
                  </TableCell>
                  <TableCell>{record.room}</TableCell>
                  <TableCell>{record.bedNo}</TableCell>
                  <TableCell>{record.sharingType}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        record.action === "Occupied" ? "default" :
                        record.action === "Vacated" ? "secondary" :
                        record.action === "Reserved" ? "outline" : "destructive"
                      }
                    >
                      {record.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.tenant}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Trend Summary */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Monthly Trend Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>New Occupancies</TableHead>
                <TableHead>Vacated</TableHead>
                <TableHead>Net Change</TableHead>
                <TableHead>Occupancy Rate</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyStats.map((stat, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{stat.month}</TableCell>
                  <TableCell className="text-green-600">+{stat.occupied}</TableCell>
                  <TableCell className="text-red-600">-{stat.vacated}</TableCell>
                  <TableCell className={stat.netChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stat.netChange >= 0 ? '+' : ''}{stat.netChange}
                  </TableCell>
                  <TableCell>{stat.occupancyRate}%</TableCell>
                  <TableCell>
                    {stat.netChange >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacancyHistory;
