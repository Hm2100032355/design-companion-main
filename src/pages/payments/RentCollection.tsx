import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, IndianRupee, TrendingUp, Clock, CheckCircle, Plus, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RentCollection() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMonth, setFilterMonth] = useState("january-2025");
  const [collectDialogOpen, setCollectDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const rentData = [
    { id: 1, tenant: "Rahul Kumar", room: "101", bed: "A", rent: 8000, dueDate: "2025-01-05", paidDate: "2025-01-03", paidAmount: 8000, status: "paid", method: "UPI" },
    { id: 2, tenant: "Suresh Reddy", room: "101", bed: "B", rent: 8000, dueDate: "2025-01-05", paidDate: "2025-01-05", paidAmount: 8000, status: "paid", method: "Cash" },
    { id: 3, tenant: "Amit Sharma", room: "102", bed: "A", rent: 6000, dueDate: "2025-01-05", paidDate: null, paidAmount: 0, status: "pending", method: null },
    { id: 4, tenant: "Vijay Kumar", room: "103", bed: "A", rent: 8000, dueDate: "2025-01-05", paidDate: "2025-01-04", paidAmount: 8000, status: "paid", method: "Bank Transfer" },
    { id: 5, tenant: "Ravi Teja", room: "103", bed: "B", rent: 8000, dueDate: "2025-01-05", paidDate: "2025-01-10", paidAmount: 6000, status: "partial", method: "UPI" },
    { id: 6, tenant: "Kiran Reddy", room: "201", bed: "A", rent: 12000, dueDate: "2025-01-05", paidDate: "2025-01-02", paidAmount: 12000, status: "paid", method: "UPI" },
    { id: 7, tenant: "Naveen Kumar", room: "203", bed: "A", rent: 9000, dueDate: "2025-01-05", paidDate: null, paidAmount: 0, status: "overdue", method: null },
    { id: 8, tenant: "Praveen", room: "301", bed: "A", rent: 4500, dueDate: "2025-01-05", paidDate: "2025-01-05", paidAmount: 4500, status: "paid", method: "Cash" },
  ];

  const filteredData = rentData.filter(item => {
    const matchesSearch = item.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.room.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalExpected: rentData.reduce((sum, r) => sum + r.rent, 0),
    totalCollected: rentData.reduce((sum, r) => sum + r.paidAmount, 0),
    pending: rentData.filter(r => r.status === "pending" || r.status === "partial" || r.status === "overdue").reduce((sum, r) => sum + (r.rent - r.paidAmount), 0),
    paidCount: rentData.filter(r => r.status === "paid").length,
  };

  const handleCollectRent = () => {
    toast({
      title: "Payment Recorded",
      description: `Rent payment for ${selectedTenant?.tenant} has been recorded successfully.`,
    });
    setCollectDialogOpen(false);
    setSelectedTenant(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Rent Collection</h1>
          <p className="text-muted-foreground mt-1">Collect and track rent payments</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.totalExpected.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Expected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.totalCollected.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Collected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{stats.pending.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.paidCount}/{rentData.length}</p>
                <p className="text-xs text-muted-foreground">Tenants Paid</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by tenant name or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterMonth} onValueChange={setFilterMonth}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january-2025">January 2025</SelectItem>
                <SelectItem value="december-2024">December 2024</SelectItem>
                <SelectItem value="november-2024">November 2024</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rent Table */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Room / Bed</TableHead>
                <TableHead>Rent Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.tenant}</TableCell>
                  <TableCell>
                    <span>Room {item.room}</span>
                    <span className="text-muted-foreground"> / Bed {item.bed}</span>
                  </TableCell>
                  <TableCell>₹{item.rent.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(item.dueDate).toLocaleDateString("en-IN", { 
                      day: "numeric", month: "short" 
                    })}
                  </TableCell>
                  <TableCell>
                    {item.paidAmount > 0 ? (
                      <span className={item.paidAmount < item.rent ? "text-warning" : "text-success"}>
                        ₹{item.paidAmount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.paidDate ? (
                      new Date(item.paidDate).toLocaleDateString("en-IN", { 
                        day: "numeric", month: "short" 
                      })
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.method || <span className="text-muted-foreground">-</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      item.status === "paid" ? "default" :
                      item.status === "pending" ? "secondary" :
                      item.status === "partial" ? "outline" : "destructive"
                    }>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.status !== "paid" && (
                      <Dialog open={collectDialogOpen && selectedTenant?.id === item.id} onOpenChange={(open) => {
                        setCollectDialogOpen(open);
                        if (open) setSelectedTenant(item);
                      }}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Plus className="w-4 h-4 mr-1" />
                            Collect
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Collect Rent Payment</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="p-4 bg-muted/50 rounded-lg">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Tenant</span>
                                <span className="font-medium">{item.tenant}</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Room / Bed</span>
                                <span className="font-medium">Room {item.room} / Bed {item.bed}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Pending Amount</span>
                                <span className="font-bold text-primary">₹{(item.rent - item.paidAmount).toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Payment Amount</Label>
                              <Input type="number" placeholder="Enter amount" defaultValue={item.rent - item.paidAmount} />
                            </div>
                            <div className="space-y-2">
                              <Label>Payment Method</Label>
                              <Select defaultValue="upi">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cash">Cash</SelectItem>
                                  <SelectItem value="upi">UPI</SelectItem>
                                  <SelectItem value="bank">Bank Transfer</SelectItem>
                                  <SelectItem value="card">Card</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Payment Date</Label>
                              <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <Button className="w-full" onClick={handleCollectRent}>
                              Record Payment
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
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
