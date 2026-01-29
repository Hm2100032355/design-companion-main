import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, FileText, Upload, Eye, Download, CheckCircle, XCircle, AlertCircle, User } from "lucide-react";

const tenantDocuments = [
  { id: "T001", name: "Rahul Kumar", room: "101", aadhar: { status: "verified", file: "aadhar_rahul.pdf" }, pan: { status: "verified", file: "pan_rahul.pdf" }, photo: { status: "verified", file: "photo_rahul.jpg" }, agreement: { status: "verified", file: "agreement_rahul.pdf" } },
  { id: "T002", name: "Suresh Reddy", room: "203", aadhar: { status: "verified", file: "aadhar_suresh.pdf" }, pan: { status: "pending", file: null }, photo: { status: "verified", file: "photo_suresh.jpg" }, agreement: { status: "verified", file: "agreement_suresh.pdf" } },
  { id: "T003", name: "Amit Sharma", room: "102", aadhar: { status: "verified", file: "aadhar_amit.pdf" }, pan: { status: "verified", file: "pan_amit.pdf" }, photo: { status: "pending", file: null }, agreement: { status: "pending", file: null } },
  { id: "T004", name: "Priya Patel", room: "301", aadhar: { status: "rejected", file: "aadhar_priya.pdf" }, pan: { status: "verified", file: "pan_priya.pdf" }, photo: { status: "verified", file: "photo_priya.jpg" }, agreement: { status: "verified", file: "agreement_priya.pdf" } },
];

export default function TenantDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTenants = tenantDocuments.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.room.includes(searchQuery) ||
      tenant.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    
    const hasStatus = 
      tenant.aadhar.status === filterStatus ||
      tenant.pan.status === filterStatus ||
      tenant.photo.status === filterStatus ||
      tenant.agreement.status === filterStatus;
    
    return matchesSearch && hasStatus;
  });

  const stats = {
    total: tenantDocuments.length * 4,
    verified: tenantDocuments.reduce((sum, t) => 
      sum + [t.aadhar, t.pan, t.photo, t.agreement].filter(d => d.status === "verified").length, 0),
    pending: tenantDocuments.reduce((sum, t) => 
      sum + [t.aadhar, t.pan, t.photo, t.agreement].filter(d => d.status === "pending").length, 0),
    rejected: tenantDocuments.reduce((sum, t) => 
      sum + [t.aadhar, t.pan, t.photo, t.agreement].filter(d => d.status === "rejected").length, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case "pending": return <Badge className="bg-amber-100 text-amber-700"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Tenant Documents</h1>
          <p className="text-muted-foreground">Manage tenant ID proofs and documents</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Bulk Upload
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.verified}</p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.rejected}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
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
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Aadhar Card</TableHead>
                <TableHead>PAN Card</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Rent Agreement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-muted rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-sm text-muted-foreground">{tenant.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{tenant.room}</TableCell>
                  <TableCell>{getStatusBadge(tenant.aadhar.status)}</TableCell>
                  <TableCell>{getStatusBadge(tenant.pan.status)}</TableCell>
                  <TableCell>{getStatusBadge(tenant.photo.status)}</TableCell>
                  <TableCell>{getStatusBadge(tenant.agreement.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Documents - {tenant.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <span>Aadhar Card</span>
                                </div>
                                {getStatusBadge(tenant.aadhar.status)}
                              </div>
                              {tenant.aadhar.file && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Download className="h-4 w-4 mr-1" />
                                  {tenant.aadhar.file}
                                </Button>
                              )}
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <span>PAN Card</span>
                                </div>
                                {getStatusBadge(tenant.pan.status)}
                              </div>
                              {tenant.pan.file && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Download className="h-4 w-4 mr-1" />
                                  {tenant.pan.file}
                                </Button>
                              )}
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <span>Photo</span>
                                </div>
                                {getStatusBadge(tenant.photo.status)}
                              </div>
                              {tenant.photo.file && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Download className="h-4 w-4 mr-1" />
                                  {tenant.photo.file}
                                </Button>
                              )}
                            </div>
                            <div className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <span>Rent Agreement</span>
                                </div>
                                {getStatusBadge(tenant.agreement.status)}
                              </div>
                              {tenant.agreement.file && (
                                <Button variant="link" className="mt-2 p-0">
                                  <Download className="h-4 w-4 mr-1" />
                                  {tenant.agreement.file}
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4" />
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
