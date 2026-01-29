import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, IndianRupee, Calendar, User, AlertCircle, Clock, Send } from "lucide-react";

const pendingPayments = [
  { id: "P001", tenantId: "T003", name: "Amit Sharma", room: "102", month: "January 2024", rent: 8500, dueDate: "2024-01-05", daysOverdue: 17, phone: "+91 76543 21098" },
  { id: "P002", tenantId: "T005", name: "Vikram Singh", room: "104", month: "January 2024", rent: 7500, dueDate: "2024-01-05", daysOverdue: 17, phone: "+91 54321 09876" },
];

export default function PendingPayments() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredPayments = pendingPayments.filter(payment =>
    payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.room.includes(searchQuery)
  );

  const totalPending = pendingPayments.reduce((sum, p) => sum + p.rent, 0);

  const handleSendReminder = (name: string) => {
    toast({ title: "Reminder Sent", description: `Payment reminder sent to ${name}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Pending Payments</h1>
          <p className="text-muted-foreground">₹{totalPending.toLocaleString()} pending from {pendingPayments.length} tenants</p>
        </div>
        <Button><Send className="h-4 w-4 mr-2" />Send All Reminders</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-red-100 rounded-lg"><IndianRupee className="h-5 w-5 text-red-600" /></div><div><p className="text-2xl font-bold">₹{totalPending.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Pending</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-amber-100 rounded-lg"><User className="h-5 w-5 text-amber-600" /></div><div><p className="text-2xl font-bold">{pendingPayments.length}</p><p className="text-sm text-muted-foreground">Tenants Pending</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-red-100 rounded-lg"><Clock className="h-5 w-5 text-red-600" /></div><div><p className="text-2xl font-bold">{pendingPayments.filter(p => p.daysOverdue > 15).length}</p><p className="text-sm text-muted-foreground">15+ Days Overdue</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by name or room..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div></CardContent></Card>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>Tenant</TableHead><TableHead>Room</TableHead><TableHead>Month</TableHead><TableHead>Amount</TableHead><TableHead>Due Date</TableHead><TableHead>Days Overdue</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>{filteredPayments.map((payment) => (
            <TableRow key={payment.id}><TableCell><div><p className="font-medium">{payment.name}</p><p className="text-sm text-muted-foreground">{payment.phone}</p></div></TableCell><TableCell>{payment.room}</TableCell><TableCell>{payment.month}</TableCell><TableCell className="font-semibold">₹{payment.rent.toLocaleString()}</TableCell><TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell><TableCell><Badge variant="destructive">{payment.daysOverdue} days</Badge></TableCell><TableCell><Button size="sm" variant="outline" onClick={() => handleSendReminder(payment.name)}><Send className="h-4 w-4 mr-1" />Remind</Button></TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
