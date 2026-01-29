import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Wrench, User, AlertCircle } from "lucide-react";
import { useState } from "react";

const openComplaints = [
  { id: "C006", title: "Bathroom Leak", room: "103", tenant: "Amit Sharma", priority: "high", category: "Plumbing" },
  { id: "C007", title: "Fan Not Working", room: "205", tenant: "Vikram Singh", priority: "medium", category: "Electrical" },
];

const maintenanceStaff = ["Ramesh (Plumber)", "Kumar (Electrician)", "Suresh (Carpenter)", "Vijay (General)"];

export default function AssignMaintenance() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleAssign = (id: string) => {
    if (assignments[id]) {
      toast({ title: "Assigned", description: `Complaint ${id} assigned to ${assignments[id]}` });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Assign Maintenance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-amber-100 rounded-lg"><AlertCircle className="h-5 w-5 text-amber-600" /></div><div><p className="text-2xl font-bold">{openComplaints.length}</p><p className="text-sm text-muted-foreground">Unassigned</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><User className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold">{maintenanceStaff.length}</p><p className="text-sm text-muted-foreground">Available Staff</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-red-100 rounded-lg"><Wrench className="h-5 w-5 text-red-600" /></div><div><p className="text-2xl font-bold">{openComplaints.filter(c => c.priority === "high").length}</p><p className="text-sm text-muted-foreground">High Priority</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Issue</TableHead><TableHead>Room</TableHead><TableHead>Category</TableHead><TableHead>Priority</TableHead><TableHead>Assign To</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
          <TableBody>{openComplaints.map((complaint) => (
            <TableRow key={complaint.id}><TableCell className="font-medium">{complaint.id}</TableCell><TableCell>{complaint.title}</TableCell><TableCell>{complaint.room}</TableCell><TableCell><Badge variant="outline">{complaint.category}</Badge></TableCell><TableCell><Badge className={complaint.priority === "high" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}>{complaint.priority}</Badge></TableCell><TableCell><Select value={assignments[complaint.id] || ""} onValueChange={(val) => setAssignments({ ...assignments, [complaint.id]: val })}><SelectTrigger className="w-48"><SelectValue placeholder="Select staff" /></SelectTrigger><SelectContent>{maintenanceStaff.map((staff) => (<SelectItem key={staff} value={staff}>{staff}</SelectItem>))}</SelectContent></Select></TableCell><TableCell><Button size="sm" onClick={() => handleAssign(complaint.id)} disabled={!assignments[complaint.id]}>Assign</Button></TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
