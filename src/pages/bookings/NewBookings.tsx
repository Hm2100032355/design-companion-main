import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, User, Phone, Mail, MapPin, Building2, Check, X, Eye, Clock } from "lucide-react";

const bookingRequests = [
  { id: "B001", name: "Arjun Mehta", phone: "+91 99887 76655", email: "arjun.mehta@email.com", preferredRoom: "2-Sharing", budget: "7000-8000", moveInDate: "2024-02-01", source: "Website", requestDate: "2024-01-20", status: "pending", occupation: "Software Engineer", company: "Wipro", message: "Looking for a clean PG near metro station." },
  { id: "B002", name: "Kavitha Reddy", phone: "+91 88776 65544", email: "kavitha.r@email.com", preferredRoom: "Single", budget: "10000-12000", moveInDate: "2024-02-15", source: "Referral", requestDate: "2024-01-22", status: "pending", occupation: "Marketing Manager", company: "Amazon", message: "Need AC room with attached bathroom." },
];

export default function NewBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    toast({ title: "Booking Approved", description: `Booking ${id} has been approved successfully.` });
  };

  const handleReject = (id: string) => {
    toast({ title: "Booking Rejected", description: `Booking ${id} has been rejected.`, variant: "destructive" });
  };

  const filteredBookings = bookingRequests.filter(booking =>
    booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.phone.includes(searchQuery) ||
    booking.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">New Booking Requests</h1>
          <p className="text-muted-foreground">{bookingRequests.length} pending booking requests</p>
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
                <p className="text-2xl font-bold">{bookingRequests.length}</p>
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
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Approved (Month)</p>
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
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Rejected (Month)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Beds Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or booking ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Cards */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{booking.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto lg:ml-0">
                      {booking.source}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.preferredRoom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Move-in: {new Date(booking.moveInDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary">Budget: ₹{booking.budget}</Badge>
                    <Badge variant="secondary">{booking.occupation}</Badge>
                    <Badge variant="secondary">{booking.company}</Badge>
                  </div>

                  {booking.message && (
                    <p className="mt-3 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      "{booking.message}"
                    </p>
                  )}

                  <p className="mt-3 text-xs text-muted-foreground">
                    Requested on: {new Date(booking.requestDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-row lg:flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 lg:flex-none">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Booking Request Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-muted-foreground">Name</Label>
                            <p className="font-medium">{booking.name}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Phone</Label>
                            <p className="font-medium">{booking.phone}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Email</Label>
                            <p className="font-medium">{booking.email}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Preferred Room</Label>
                            <p className="font-medium">{booking.preferredRoom}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Budget</Label>
                            <p className="font-medium">₹{booking.budget}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Move-in Date</Label>
                            <p className="font-medium">{new Date(booking.moveInDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Occupation</Label>
                            <p className="font-medium">{booking.occupation}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Company</Label>
                            <p className="font-medium">{booking.company}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Message</Label>
                          <p className="font-medium">{booking.message || "No message"}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700" onClick={() => handleApprove(booking.id)}>
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" className="flex-1 lg:flex-none" onClick={() => handleReject(booking.id)}>
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No pending booking requests found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
