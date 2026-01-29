import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, IndianRupee, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentHistory = [
  { id: "TXN001", name: "Rahul Kumar", room: "101", amount: 8000, date: "2024-01-05", method: "UPI", month: "January 2024", status: "success" },
  { id: "TXN002", name: "Suresh Reddy", room: "203", amount: 7500, date: "2024-01-06", method: "Cash", month: "January 2024", status: "success" },
  { id: "TXN003", name: "Priya Patel", room: "301", amount: 9000, date: "2024-01-04", method: "Bank Transfer", month: "January 2024", status: "success" },
  { id: "TXN004", name: "Amit Sharma", room: "102", amount: 8500, date: "2023-12-05", method: "UPI", month: "December 2023", status: "success" },
];

export default function PaymentHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMonth, setFilterMonth] = useState("all");

  const filteredPayments = paymentHistory.filter(payment => {
    const matchesSearch = payment.name.toLowerCase().includes(searchQuery.toLowerCase()) || payment.room.includes(searchQuery);
    const matchesMonth = filterMonth === "all" || payment.month.includes(filterMonth);
    return matchesSearch && matchesMonth;
  });

  const totalCollected = paymentHistory.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-display font-bold">Payment History</h1>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><IndianRupee className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold">₹{totalCollected.toLocaleString()}</p><p className="text-sm text-muted-foreground">Total Collected</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-blue-100 rounded-lg"><Calendar className="h-5 w-5 text-blue-600" /></div><div><p className="text-2xl font-bold">{paymentHistory.length}</p><p className="text-sm text-muted-foreground">Transactions</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><IndianRupee className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">₹{Math.round(totalCollected / paymentHistory.length).toLocaleString()}</p><p className="text-sm text-muted-foreground">Avg. Payment</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex flex-col md:flex-row gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" /></div><Select value={filterMonth} onValueChange={setFilterMonth}><SelectTrigger className="w-full md:w-40"><SelectValue placeholder="Month" /></SelectTrigger><SelectContent><SelectItem value="all">All Months</SelectItem><SelectItem value="January">January</SelectItem><SelectItem value="December">December</SelectItem></SelectContent></Select></div></CardContent></Card>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>Transaction ID</TableHead><TableHead>Tenant</TableHead><TableHead>Room</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Method</TableHead><TableHead>Month</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>{filteredPayments.map((payment) => (
            <TableRow key={payment.id}><TableCell className="font-medium">{payment.id}</TableCell><TableCell>{payment.name}</TableCell><TableCell>{payment.room}</TableCell><TableCell className="font-semibold">₹{payment.amount.toLocaleString()}</TableCell><TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell><TableCell><Badge variant="outline">{payment.method}</Badge></TableCell><TableCell>{payment.month}</TableCell><TableCell><Badge className="bg-green-100 text-green-700">Success</Badge></TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
