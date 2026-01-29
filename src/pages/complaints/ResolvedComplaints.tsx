import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Star, Calendar } from "lucide-react";

const resolvedComplaints = [
  { id: "C001", title: "Water Leakage", room: "102", tenant: "Rahul Kumar", resolvedBy: "Plumber - Ramesh", resolvedDate: "2024-01-18", rating: 5 },
  { id: "C002", title: "Electrical Issue", room: "201", tenant: "Suresh Reddy", resolvedBy: "Electrician - Kumar", resolvedDate: "2024-01-17", rating: 4 },
  { id: "C005", title: "WiFi Not Working", room: "301", tenant: "Priya Patel", resolvedBy: "IT - Vijay", resolvedDate: "2024-01-15", rating: 5 },
];

export default function ResolvedComplaints() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Resolved Complaints</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold">{resolvedComplaints.length}</p><p className="text-sm text-muted-foreground">Resolved This Month</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-amber-100 rounded-lg"><Star className="h-5 w-5 text-amber-600" /></div><div><p className="text-2xl font-bold">4.7</p><p className="text-sm text-muted-foreground">Avg. Rating</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><Calendar className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold">2 days</p><p className="text-sm text-muted-foreground">Avg. Resolution Time</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Issue</TableHead><TableHead>Room</TableHead><TableHead>Tenant</TableHead><TableHead>Resolved By</TableHead><TableHead>Resolved Date</TableHead><TableHead>Rating</TableHead></TableRow></TableHeader>
          <TableBody>{resolvedComplaints.map((complaint) => (
            <TableRow key={complaint.id}><TableCell className="font-medium">{complaint.id}</TableCell><TableCell>{complaint.title}</TableCell><TableCell>{complaint.room}</TableCell><TableCell>{complaint.tenant}</TableCell><TableCell>{complaint.resolvedBy}</TableCell><TableCell>{new Date(complaint.resolvedDate).toLocaleDateString()}</TableCell><TableCell><div className="flex items-center gap-1">{Array.from({ length: complaint.rating }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />))}</div></TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
