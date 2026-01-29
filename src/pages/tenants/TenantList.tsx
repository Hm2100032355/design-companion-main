import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Eye, Edit, Phone, Mail, Calendar, Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TenantList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRoom, setFilterRoom] = useState("all");

  const tenants = [
    { id: 1, name: "Rahul Kumar", mobile: "9876543210", email: "rahul@email.com", room: "101", bed: "A", joinDate: "2024-01-15", rent: 8000, status: "active", dueAmount: 0, idProof: "Aadhar" },
    { id: 2, name: "Suresh Reddy", mobile: "9876543211", email: "suresh@email.com", room: "101", bed: "B", joinDate: "2024-02-01", rent: 8000, status: "active", dueAmount: 0, idProof: "PAN" },
    { id: 3, name: "Amit Sharma", mobile: "9876543212", email: "amit@email.com", room: "102", bed: "A", joinDate: "2024-03-10", rent: 6000, status: "active", dueAmount: 6000, idProof: "Aadhar" },
    { id: 4, name: "Vijay Kumar", mobile: "9876543213", email: "vijay@email.com", room: "103", bed: "A", joinDate: "2024-01-20", rent: 8000, status: "active", dueAmount: 0, idProof: "Aadhar" },
    { id: 5, name: "Ravi Teja", mobile: "9876543214", email: "ravi@email.com", room: "103", bed: "B", joinDate: "2024-04-05", rent: 8000, status: "active", dueAmount: 2000, idProof: "Voter ID" },
    { id: 6, name: "Kiran Reddy", mobile: "9876543215", email: "kiran@email.com", room: "201", bed: "A", joinDate: "2024-02-15", rent: 12000, status: "active", dueAmount: 0, idProof: "Passport" },
    { id: 7, name: "Naveen Kumar", mobile: "9876543216", email: "naveen@email.com", room: "203", bed: "A", joinDate: "2024-05-01", rent: 9000, status: "notice", dueAmount: 0, idProof: "Aadhar" },
    { id: 8, name: "Praveen", mobile: "9876543217", email: "praveen@email.com", room: "301", bed: "A", joinDate: "2024-03-20", rent: 4500, status: "active", dueAmount: 0, idProof: "Aadhar" },
  ];

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tenant.mobile.includes(searchQuery) ||
                          tenant.room.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || tenant.status === filterStatus;
    const matchesRoom = filterRoom === "all" || tenant.room === filterRoom;
    return matchesSearch && matchesStatus && matchesRoom;
  });

  const stats = {
    total: tenants.length,
    active: tenants.filter(t => t.status === "active").length,
    notice: tenants.filter(t => t.status === "notice").length,
    dueAmount: tenants.reduce((sum, t) => sum + t.dueAmount, 0),
  };

  const uniqueRooms = [...new Set(tenants.map(t => t.room))].sort();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Tenant List</h1>
          <p className="text-muted-foreground mt-1">View and manage all tenants in your PG</p>
        </div>
        <Button onClick={() => navigate("/dashboard/tenants/add")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Tenants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active Tenants</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <UserX className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.notice}</p>
                <p className="text-xs text-muted-foreground">On Notice</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <span className="text-destructive font-bold">₹</span>
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.dueAmount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Dues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, mobile or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="notice">On Notice</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRoom} onValueChange={setFilterRoom}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Filter by room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                {uniqueRooms.map((room) => (
                  <SelectItem key={room} value={room}>Room {room}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Room / Bed</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Due Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {tenant.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-xs text-muted-foreground">{tenant.idProof}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        {tenant.mobile}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {tenant.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">Room {tenant.room}</span>
                    <span className="text-muted-foreground"> / Bed {tenant.bed}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {new Date(tenant.joinDate).toLocaleDateString("en-IN", { 
                        day: "numeric", month: "short", year: "numeric" 
                      })}
                    </div>
                  </TableCell>
                  <TableCell>₹{tenant.rent.toLocaleString()}</TableCell>
                  <TableCell>
                    {tenant.dueAmount > 0 ? (
                      <span className="text-destructive font-medium">₹{tenant.dueAmount.toLocaleString()}</span>
                    ) : (
                      <span className="text-success">Paid</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
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
