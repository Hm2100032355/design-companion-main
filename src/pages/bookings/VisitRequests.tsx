import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, User, Phone, Clock, Check, X, MapPin } from "lucide-react";

const visitRequests = [
  { id: "V001", name: "Rohit Sharma", phone: "+91 99887 11223", preferredDate: "2024-01-25", preferredTime: "10:00 AM", status: "pending", source: "Website", notes: "Interested in 2-sharing room" },
  { id: "V002", name: "Sneha Iyer", phone: "+91 88776 22334", preferredDate: "2024-01-26", preferredTime: "03:00 PM", status: "confirmed", source: "Phone Call", notes: "Looking for AC room" },
  { id: "V003", name: "Manoj Kumar", phone: "+91 77665 33445", preferredDate: "2024-01-27", preferredTime: "11:30 AM", status: "pending", source: "Referral", notes: "Student, needs budget room" },
];

export default function VisitRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  const handleConfirm = (id: string) => {
    toast({ title: "Visit Confirmed", description: `Visit ${id} has been confirmed.` });
  };

  const handleCancel = (id: string) => {
    toast({ title: "Visit Cancelled", description: `Visit ${id} has been cancelled.`, variant: "destructive" });
  };

  const filteredVisits = visitRequests.filter(visit => {
    const matchesSearch = visit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.phone.includes(searchQuery);
    const matchesStatus = filterStatus === "all" || visit.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "confirmed": return <Badge className="bg-green-100 text-green-700">Confirmed</Badge>;
      case "completed": return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>;
      case "cancelled": return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Visit Requests</h1>
          <p className="text-muted-foreground">Manage property visit requests from potential tenants</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visitRequests.filter(v => v.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visitRequests.filter(v => v.status === "confirmed").length}</p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Completed (Month)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Cancelled</p>
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
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Visit Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVisits.map((visit) => (
          <Card key={visit.id} className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{visit.name}</h3>
                    <p className="text-sm text-muted-foreground">{visit.id}</p>
                  </div>
                </div>
                {getStatusBadge(visit.status)}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{visit.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(visit.preferredDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{visit.preferredTime}</span>
                </div>
              </div>

              <div className="mt-3">
                <Badge variant="outline">{visit.source}</Badge>
              </div>

              {visit.notes && (
                <p className="mt-3 text-sm text-muted-foreground bg-muted p-2 rounded">
                  {visit.notes}
                </p>
              )}

              {visit.status === "pending" && (
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700" size="sm" onClick={() => handleConfirm(visit.id)}>
                    <Check className="h-4 w-4 mr-1" />
                    Confirm
                  </Button>
                  <Button variant="destructive" className="flex-1" size="sm" onClick={() => handleCancel(visit.id)}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
