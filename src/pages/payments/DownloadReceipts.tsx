import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const receipts = [
  { id: "RCP001", name: "Rahul Kumar", room: "101", amount: 8000, date: "2024-01-05", month: "January 2024" },
  { id: "RCP002", name: "Suresh Reddy", room: "203", amount: 7500, date: "2024-01-06", month: "January 2024" },
  { id: "RCP003", name: "Priya Patel", room: "301", amount: 9000, date: "2024-01-04", month: "January 2024" },
];

export default function DownloadReceipts() {
  const { toast } = useToast();

  const handleDownload = (id: string) => {
    toast({ title: "Downloading", description: `Receipt ${id} is being downloaded` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-display font-bold">Download Receipts</h1>
        <Button><Download className="h-4 w-4 mr-2" />Download All</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><FileText className="h-5 w-5 text-primary" /></div><div><p className="text-2xl font-bold">{receipts.length}</p><p className="text-sm text-muted-foreground">Receipts Generated</p></div></div></CardContent></Card>
        <Card className="border-0 shadow-card"><CardContent className="p-4"><div className="flex items-center gap-3"><div className="p-2 bg-green-100 rounded-lg"><Calendar className="h-5 w-5 text-green-600" /></div><div><p className="text-2xl font-bold">January 2024</p><p className="text-sm text-muted-foreground">Current Month</p></div></div></CardContent></Card>
      </div>

      <Card className="border-0 shadow-card"><CardContent className="p-0">
        <Table><TableHeader><TableRow><TableHead>Receipt ID</TableHead><TableHead>Tenant</TableHead><TableHead>Room</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Month</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
          <TableBody>{receipts.map((receipt) => (
            <TableRow key={receipt.id}><TableCell className="font-medium">{receipt.id}</TableCell><TableCell>{receipt.name}</TableCell><TableCell>{receipt.room}</TableCell><TableCell className="font-semibold">₹{receipt.amount.toLocaleString()}</TableCell><TableCell>{new Date(receipt.date).toLocaleDateString()}</TableCell><TableCell>{receipt.month}</TableCell><TableCell><Button size="sm" variant="outline" onClick={() => handleDownload(receipt.id)}><Download className="h-4 w-4 mr-1" />Download</Button></TableCell></TableRow>
          ))}</TableBody></Table>
      </CardContent></Card>
    </div>
  );
}
