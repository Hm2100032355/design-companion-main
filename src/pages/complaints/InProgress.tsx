import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Wrench, User } from "lucide-react";

const inProgressComplaints = [
  { id: "C003", title: "AC Not Cooling", room: "202", tenant: "Ankit Verma", assignedTo: "Ramesh (AC Technician)", priority: "high", startedDate: "2024-01-20", expectedCompletion: "2024-01-22" },
  { id: "C004", title: "Door Lock Issue", room: "105", tenant: "Meera Singh", assignedTo: "Suresh (Carpenter)", priority: "medium", startedDate: "2024-01-21", expectedCompletion: "2024-01-22" },
];

export default function InProgress() {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">In-Progress Complaints</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><Clock className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold">{inProgressComplaints.length}</p><p className="text-sm text-muted-foreground">In Progress</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-amber-100 rounded-lg"><Wrench className="h-5 w-5 text-amber-600" /></div><div><p className="text-2xl font-bold">{inProgressComplaints.filter(c => c.priority === "high").length}</p><p className="text-sm text-muted-foreground">High Priority</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><User className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Staff Assigned</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Issue</TableHead><TableHead>Room</TableHead><TableHead>Tenant</TableHead><TableHead>Assigned To</TableHead><TableHead>Priority</TableHead><TableHead>Started</TableHead><TableHead>Expected</TableHead></TableRow></TableHeader>
          <TableBody>{inProgressComplaints.map((complaint) => (
            <TableRow key={complaint.id}><TableCell className="font-medium">{complaint.id}</TableCell><TableCell>{complaint.title}</TableCell><TableCell>{complaint.room}</TableCell><TableCell>{complaint.tenant}</TableCell><TableCell>{complaint.assignedTo}</TableCell><TableCell><Badge className={complaint.priority === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}>{complaint.priority}</Badge></TableCell><TableCell>{new Date(complaint.startedDate).toLocaleDateString()}</TableCell><TableCell>{new Date(complaint.expectedCompletion).toLocaleDateString()}</TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
