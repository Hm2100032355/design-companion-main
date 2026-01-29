import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, Building2, Calendar, Phone, Download } from "lucide-react";

const activeTenants = [
  { id: "T001", name: "Rahul Kumar", room: "101", bed: "A", floor: "1", phone: "+91 98765 43210", joinDate: "2024-01-15", rentDue: "5th", rentStatus: "paid", rent: 8000 },
  { id: "T002", name: "Suresh Reddy", room: "203", bed: "B", floor: "2", phone: "+91 87654 32109", joinDate: "2024-02-20", rentDue: "5th", rentStatus: "paid", rent: 7500 },
  { id: "T003", name: "Amit Sharma", room: "102", bed: "A", floor: "1", phone: "+91 76543 21098", joinDate: "2023-11-10", rentDue: "5th", rentStatus: "pending", rent: 8500 },
  { id: "T004", name: "Priya Patel", room: "301", bed: "A", floor: "3", phone: "+91 65432 10987", joinDate: "2024-03-01", rentDue: "5th", rentStatus: "paid", rent: 9000 },
  { id: "T005", name: "Vikram Singh", room: "104", bed: "B", floor: "1", phone: "+91 54321 09876", joinDate: "2024-01-25", rentDue: "5th", rentStatus: "overdue", rent: 7500 },
];

export default function ActiveTenants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFloor, setFilterFloor] = useState("all");
  const [filterRentStatus, setFilterRentStatus] = useState("all");

  const filteredTenants = activeTenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.room.includes(searchQuery) ||
      tenant.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFloor = filterFloor === "all" || tenant.floor === filterFloor;
    const matchesRent = filterRentStatus === "all" || tenant.rentStatus === filterRentStatus;
    return matchesSearch && matchesFloor && matchesRent;
  });

  const stats = {
    total: activeTenants.length,
    floor1: activeTenants.filter(t => t.floor === "1").length,
    floor2: activeTenants.filter(t => t.floor === "2").length,
    floor3: activeTenants.filter(t => t.floor === "3").length,
  };

  const getRentStatusBadge = (status: string) => {
    switch (status) {
      case "paid": return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "overdue": return <Badge className="bg-red-100 text-red-700">Overdue</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Active Tenants</h1>
          <p className="text-muted-foreground">{stats.total} tenants currently staying</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export List
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.floor1}</p>
                <p className="text-sm text-muted-foreground">Floor 1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.floor2}</p>
                <p className="text-sm text-muted-foreground">Floor 2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Building2 className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.floor3}</p>
                <p className="text-sm text-muted-foreground">Floor 3</p>
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
            <Select value={filterFloor} onValueChange={setFilterFloor}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">Floor 1</SelectItem>
                <SelectItem value="2">Floor 2</SelectItem>
                <SelectItem value="3">Floor 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRentStatus} onValueChange={setFilterRentStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Rent Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Room / Bed</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Rent Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.id}</TableCell>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.room} / {tenant.bed}</TableCell>
                  <TableCell>Floor {tenant.floor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {tenant.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(tenant.joinDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>₹{tenant.rent.toLocaleString()}</TableCell>
                  <TableCell>{getRentStatusBadge(tenant.rentStatus)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
