import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Wrench, IndianRupee } from "lucide-react";

const maintenanceHistory = [
  { id: "M001", issue: "Water Pump Repair", room: "Common", completedBy: "Ramesh", completedDate: "2024-01-15", cost: 2500, warranty: "3 months" },
  { id: "M002", issue: "AC Servicing", room: "202, 203, 205", completedBy: "AC Service Co.", completedDate: "2024-01-10", cost: 4500, warranty: "1 month" },
  { id: "M003", issue: "Electrical Wiring", room: "Floor 2", completedBy: "Kumar", completedDate: "2024-01-05", cost: 3000, warranty: "6 months" },
];

export default function MaintenanceHistory() {
  const totalCost = maintenanceHistory.reduce((sum, m) => sum + m.cost, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Maintenance History</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><History className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">{maintenanceHistory.length}</p><p className="text-sm text-muted-foreground">Total Records</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><Wrench className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold">{maintenanceHistory.length}</p><p className="text-sm text-muted-foreground">Completed</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><IndianRupee className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold">₹{totalCost.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Cost</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Issue</TableHead><TableHead>Location</TableHead><TableHead>Completed By</TableHead><TableHead>Date</TableHead><TableHead>Cost</TableHead><TableHead>Warranty</TableHead></TableRow></TableHeader>
          <TableBody>{maintenanceHistory.map((record) => (
            <TableRow key={record.id}><TableCell className="font-medium">{record.id}</TableCell><TableCell>{record.issue}</TableCell><TableCell>{record.room}</TableCell><TableCell>{record.completedBy}</TableCell><TableCell>{new Date(record.completedDate).toLocaleDateString()}</TableCell><TableCell>₹{record.cost.toLocaleString()}</TableCell><TableCell><Badge variant="outline">{record.warranty}</Badge></TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
