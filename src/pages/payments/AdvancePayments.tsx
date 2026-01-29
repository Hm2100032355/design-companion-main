import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, User, Calendar } from "lucide-react";

const advancePayments = [
  { id: "A001", name: "Rahul Kumar", room: "101", amount: 16000, paidDate: "2024-01-15", validTill: "2025-01-14", type: "Security Deposit" },
  { id: "A002", name: "Suresh Reddy", room: "203", amount: 15000, paidDate: "2024-02-20", validTill: "2025-02-19", type: "Security Deposit" },
  { id: "A003", name: "Priya Patel", room: "301", amount: 9000, paidDate: "2024-03-01", validTill: "2024-04-01", type: "Advance Rent" },
];

export default function AdvancePayments() {
  const totalDeposits = advancePayments.filter(a => a.type === "Security Deposit").reduce((sum, a) => sum + a.amount, 0);
  const totalAdvance = advancePayments.filter(a => a.type === "Advance Rent").reduce((sum, a) => sum + a.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Advance Payments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><IndianRupee className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">₹{(totalDeposits + totalAdvance).toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Advance</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><IndianRupee className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold">₹{totalDeposits.toLocaleString()}</p><p className="text-sm text-muted-foreground">Security Deposits</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><IndianRupee className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold">₹{totalAdvance.toLocaleString()}</p><p className="text-sm text-muted-foreground">Advance Rent</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Tenant</TableHead><TableHead>Room</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Paid Date</TableHead><TableHead>Valid Till</TableHead></TableRow></TableHeader>
          <TableBody>{advancePayments.map((payment) => (
            <TableRow key={payment.id}><TableCell className="font-medium">{payment.id}</TableCell><TableCell>{payment.name}</TableCell><TableCell>{payment.room}</TableCell><TableCell><Badge variant="outline">{payment.type}</Badge></TableCell><TableCell className="font-semibold">₹{payment.amount.toLocaleString()}</TableCell><TableCell>{new Date(payment.paidDate).toLocaleDateString()}</TableCell><TableCell>{new Date(payment.validTill).toLocaleDateString()}</TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
