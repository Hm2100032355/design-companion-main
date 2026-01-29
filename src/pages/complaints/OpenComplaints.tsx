import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, AlertCircle, Wrench, Clock, CheckCircle, User, Calendar, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OpenComplaints() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const complaints = [
    { 
      id: "C001", 
      title: "Water leakage in bathroom", 
      tenant: "Rahul Kumar", 
      room: "101", 
      category: "plumbing", 
      priority: "high", 
      status: "open", 
      createdAt: "2025-01-18", 
      description: "Water is leaking from the bathroom tap and flooding the floor.",
      assignedTo: null
    },
    { 
      id: "C002", 
      title: "AC not cooling properly", 
      tenant: "Kiran Reddy", 
      room: "201", 
      category: "electrical", 
      priority: "medium", 
      status: "open", 
      createdAt: "2025-01-17", 
      description: "Air conditioner is running but not cooling the room effectively.",
      assignedTo: null
    },
    { 
      id: "C003", 
      title: "Wi-Fi connectivity issues", 
      tenant: "Amit Sharma", 
      room: "102", 
      category: "network", 
      priority: "medium", 
      status: "open", 
      createdAt: "2025-01-16", 
      description: "Internet connection keeps dropping frequently throughout the day.",
      assignedTo: "Tech Team"
    },
    { 
      id: "C004", 
      title: "Door lock not working", 
      tenant: "Vijay Kumar", 
      room: "103", 
      category: "furniture", 
      priority: "high", 
      status: "open", 
      createdAt: "2025-01-15", 
      description: "Room door lock is jammed and not opening properly.",
      assignedTo: null
    },
    { 
      id: "C005", 
      title: "Pest control needed", 
      tenant: "Praveen", 
      room: "301", 
      category: "housekeeping", 
      priority: "low", 
      status: "open", 
      createdAt: "2025-01-14", 
      description: "Seeing cockroaches in the kitchen area.",
      assignedTo: null
    },
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          complaint.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          complaint.room.includes(searchQuery);
    const matchesCategory = filterCategory === "all" || complaint.category === filterCategory;
    const matchesPriority = filterPriority === "all" || complaint.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const stats = {
    total: complaints.length,
    high: complaints.filter(c => c.priority === "high").length,
    medium: complaints.filter(c => c.priority === "medium").length,
    low: complaints.filter(c => c.priority === "low").length,
  };

  const handleAssign = (complaintId: string) => {
    toast({
      title: "Complaint Assigned",
      description: `Complaint ${complaintId} has been assigned successfully.`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "outline";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "plumbing": return "🔧";
      case "electrical": return "⚡";
      case "network": return "📶";
      case "furniture": return "🪑";
      case "housekeeping": return "🧹";
      default: return "📋";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Open Complaints</h1>
          <p className="text-muted-foreground mt-1">{stats.total} complaints require attention</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Open</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.high}</p>
                <p className="text-xs text-muted-foreground">High Priority</p>
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
                <p className="text-2xl font-bold">{stats.medium}</p>
                <p className="text-xs text-muted-foreground">Medium Priority</p>
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
                <p className="text-2xl font-bold">{stats.low}</p>
                <p className="text-xs text-muted-foreground">Low Priority</p>
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
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="housekeeping">Housekeeping</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="grid gap-4">
        {filteredComplaints.map((complaint) => (
          <Card key={complaint.id} className="border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                      {getCategoryIcon(complaint.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{complaint.title}</h3>
                        <Badge variant={getPriorityColor(complaint.priority) as any}>
                          {complaint.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{complaint.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <User className="w-3.5 h-3.5" />
                          {complaint.tenant} • Room {complaint.room}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(complaint.createdAt).toLocaleDateString("en-IN", { 
                            day: "numeric", month: "short", year: "numeric" 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-0.5 bg-muted rounded text-xs capitalize">
                            {complaint.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 lg:flex-col">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                        <Wrench className="w-4 h-4 mr-2" />
                        Assign
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Maintenance</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <p className="font-medium">{complaint.title}</p>
                          <p className="text-sm text-muted-foreground">Room {complaint.room} • {complaint.tenant}</p>
                        </div>
                        <div className="space-y-2">
                          <Label>Assign To</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select staff" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plumber">Plumber - Raju</SelectItem>
                              <SelectItem value="electrician">Electrician - Venkat</SelectItem>
                              <SelectItem value="tech">Tech Team</SelectItem>
                              <SelectItem value="housekeeping">Housekeeping</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea placeholder="Add notes for the assigned staff..." />
                        </div>
                        <Button className="w-full" onClick={() => handleAssign(complaint.id)}>
                          Assign & Notify
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm" className="flex-1 lg:flex-none">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
