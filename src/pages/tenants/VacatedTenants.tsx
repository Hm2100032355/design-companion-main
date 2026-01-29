import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserMinus, Calendar, Building2, Download, IndianRupee } from "lucide-react";

const vacatedTenants = [
  { id: "T010", name: "Ravi Verma", room: "105", floor: "1", joinDate: "2023-06-15", vacateDate: "2024-01-10", stayDuration: "7 months", reason: "Job Transfer", depositRefunded: true, refundAmount: 15000 },
  { id: "T011", name: "Neha Gupta", room: "202", floor: "2", joinDate: "2023-08-20", vacateDate: "2024-02-05", stayDuration: "5 months", reason: "Personal", depositRefunded: true, refundAmount: 16000 },
  { id: "T012", name: "Kiran Patel", room: "304", floor: "3", joinDate: "2023-03-10", vacateDate: "2023-12-25", stayDuration: "9 months", reason: "Course Completed", depositRefunded: false, refundAmount: 0 },
  { id: "T013", name: "Sanjay Kumar", room: "103", floor: "1", joinDate: "2023-09-01", vacateDate: "2024-01-20", stayDuration: "4 months", reason: "Better Accommodation", depositRefunded: true, refundAmount: 14000 },
];

export default function VacatedTenants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterReason, setFilterReason] = useState("all");

  const filteredTenants = vacatedTenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.room.includes(searchQuery) ||
      tenant.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReason = filterReason === "all" || tenant.reason === filterReason;
    return matchesSearch && matchesReason;
  });

  const stats = {
    total: vacatedTenants.length,
    thisMonth: 2,
    refundPending: vacatedTenants.filter(t => !t.depositRefunded).length,
    totalRefunded: vacatedTenants.filter(t => t.depositRefunded).reduce((sum, t) => sum + t.refundAmount, 0),
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Vacated Tenants</h1>
          <p className="text-muted-foreground">History of tenants who have moved out</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <UserMinus className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Vacated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <IndianRupee className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.refundPending}</p>
                <p className="text-sm text-muted-foreground">Refund Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <IndianRupee className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.totalRefunded.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Refunded</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, room, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="jan">January</SelectItem>
                <SelectItem value="feb">February</SelectItem>
                <SelectItem value="mar">March</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterReason} onValueChange={setFilterReason}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="Job Transfer">Job Transfer</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Course Completed">Course Completed</SelectItem>
                <SelectItem value="Better Accommodation">Better Accommodation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vacated Tenants Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Vacate Date</TableHead>
                <TableHead>Stay Duration</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Deposit Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.id}</TableCell>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {tenant.room} (Floor {tenant.floor})
                    </div>
                  </TableCell>
                  <TableCell>{new Date(tenant.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(tenant.vacateDate).toLocaleDateString()}</TableCell>
                  <TableCell>{tenant.stayDuration}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tenant.reason}</Badge>
                  </TableCell>
                  <TableCell>
                    {tenant.depositRefunded ? (
                      <Badge className="bg-green-100 text-green-700">
                        Refunded ₹{tenant.refundAmount.toLocaleString()}
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
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
}
