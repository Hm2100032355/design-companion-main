import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, XCircle, Calendar, User, AlertCircle } from "lucide-react";

const rejectedRequests = [
  { id: "B020", name: "Sunil Verma", phone: "+91 99887 55555", requestDate: "2024-01-10", rejectedDate: "2024-01-12", reason: "No vacancy", preferredRoom: "Single", notes: "All single rooms occupied" },
  { id: "B021", name: "Meera Singh", phone: "+91 88776 66666", requestDate: "2024-01-08", rejectedDate: "2024-01-09", reason: "Budget mismatch", preferredRoom: "2-Sharing", notes: "Budget too low for AC rooms" },
  { id: "B022", name: "Anil Kumar", phone: "+91 77665 77777", requestDate: "2024-01-05", rejectedDate: "2024-01-06", reason: "Incomplete documents", preferredRoom: "3-Sharing", notes: "ID proof not submitted" },
];

export default function RejectedRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterReason, setFilterReason] = useState("all");

  const filteredRequests = rejectedRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReason = filterReason === "all" || request.reason === filterReason;
    return matchesSearch && matchesReason;
  });

  const reasonCounts = {
    noVacancy: rejectedRequests.filter(r => r.reason === "No vacancy").length,
    budgetMismatch: rejectedRequests.filter(r => r.reason === "Budget mismatch").length,
    incomplete: rejectedRequests.filter(r => r.reason === "Incomplete documents").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Rejected Requests</h1>
          <p className="text-muted-foreground">View rejected booking requests history</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{rejectedRequests.length}</p>
                <p className="text-sm text-muted-foreground">Total Rejected</p>
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
                <p className="text-2xl font-bold">{reasonCounts.noVacancy}</p>
                <p className="text-sm text-muted-foreground">No Vacancy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reasonCounts.budgetMismatch}</p>
                <p className="text-sm text-muted-foreground">Budget Mismatch</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reasonCounts.incomplete}</p>
                <p className="text-sm text-muted-foreground">Incomplete Docs</p>
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
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterReason} onValueChange={setFilterReason}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Rejection Reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="No vacancy">No Vacancy</SelectItem>
                <SelectItem value="Budget mismatch">Budget Mismatch</SelectItem>
                <SelectItem value="Incomplete documents">Incomplete Docs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Preferred Room</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Rejected Date</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {request.name}
                    </div>
                  </TableCell>
                  <TableCell>{request.phone}</TableCell>
                  <TableCell>{request.preferredRoom}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(request.requestDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(request.rejectedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="destructive">{request.reason}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{request.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
