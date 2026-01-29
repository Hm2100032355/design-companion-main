import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, CheckCircle, Calendar, User, Building2, Download, UserPlus } from "lucide-react";

const approvedBookings = [
  { id: "B010", name: "Rajesh Kumar", phone: "+91 99887 12345", room: "105", bed: "A", approvedDate: "2024-01-18", moveInDate: "2024-02-01", rent: 8000, deposit: 16000, depositPaid: true, moveInStatus: "pending" },
  { id: "B011", name: "Anita Sharma", phone: "+91 88776 23456", room: "204", bed: "B", approvedDate: "2024-01-15", moveInDate: "2024-01-25", rent: 7500, deposit: 15000, depositPaid: true, moveInStatus: "completed" },
  { id: "B012", name: "Vikram Reddy", phone: "+91 77665 34567", room: "301", bed: "A", approvedDate: "2024-01-20", moveInDate: "2024-02-05", rent: 9000, deposit: 18000, depositPaid: false, moveInStatus: "pending" },
  { id: "B013", name: "Priya Patel", phone: "+91 66554 45678", room: "102", bed: "B", approvedDate: "2024-01-10", moveInDate: "2024-01-20", rent: 8500, deposit: 17000, depositPaid: true, moveInStatus: "completed" },
];

export default function ApprovedBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBookings = approvedBookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.room.includes(searchQuery) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.moveInStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: approvedBookings.length,
    pending: approvedBookings.filter(b => b.moveInStatus === "pending").length,
    completed: approvedBookings.filter(b => b.moveInStatus === "completed").length,
    depositPending: approvedBookings.filter(b => !b.depositPaid).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Approved Bookings</h1>
          <p className="text-muted-foreground">View all approved booking requests</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Move-in</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">Moved In</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Building2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.depositPending}</p>
                <p className="text-sm text-muted-foreground">Deposit Pending</p>
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
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Move-in Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending Move-in</SelectItem>
                <SelectItem value="completed">Moved In</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Room / Bed</TableHead>
                <TableHead>Approved Date</TableHead>
                <TableHead>Move-in Date</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Deposit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p>{booking.name}</p>
                        <p className="text-xs text-muted-foreground">{booking.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{booking.room} / {booking.bed}</TableCell>
                  <TableCell>{new Date(booking.approvedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(booking.moveInDate).toLocaleDateString()}</TableCell>
                  <TableCell>₹{booking.rent.toLocaleString()}</TableCell>
                  <TableCell>
                    <div>
                      <p>₹{booking.deposit.toLocaleString()}</p>
                      {booking.depositPaid ? (
                        <Badge className="bg-green-100 text-green-700 text-xs">Paid</Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 text-xs">Pending</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.moveInStatus === "completed" ? (
                      <Badge className="bg-green-100 text-green-700">Moved In</Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {booking.moveInStatus === "pending" && (
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Convert to Tenant
                      </Button>
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
