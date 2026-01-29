import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Phone, Mail, Calendar, MapPin, FileText, Edit, Building2, Bed } from "lucide-react";

const tenantProfiles = [
  {
    id: "T001",
    name: "Rahul Kumar",
    room: "101",
    bed: "A",
    floor: "1",
    phone: "+91 98765 43210",
    email: "rahul.kumar@email.com",
    joinDate: "2024-01-15",
    endDate: "2025-01-14",
    status: "active",
    rent: 8000,
    deposit: 16000,
    address: "123 Main Street, Delhi",
    emergencyContact: "+91 98765 43211",
    occupation: "Software Engineer",
    company: "TCS",
    idProof: "Aadhar Card",
    idNumber: "XXXX-XXXX-1234",
    photo: ""
  },
  {
    id: "T002",
    name: "Suresh Reddy",
    room: "203",
    bed: "B",
    floor: "2",
    phone: "+91 87654 32109",
    email: "suresh.reddy@email.com",
    joinDate: "2024-02-20",
    endDate: "2025-02-19",
    status: "active",
    rent: 7500,
    deposit: 15000,
    address: "456 Park Avenue, Hyderabad",
    emergencyContact: "+91 87654 32110",
    occupation: "Data Analyst",
    company: "Infosys",
    idProof: "PAN Card",
    idNumber: "ABCDE1234F",
    photo: ""
  },
  {
    id: "T003",
    name: "Amit Sharma",
    room: "102",
    bed: "A",
    floor: "1",
    phone: "+91 76543 21098",
    email: "amit.sharma@email.com",
    joinDate: "2023-11-10",
    endDate: "2024-11-09",
    status: "active",
    rent: 8500,
    deposit: 17000,
    address: "789 Lake View, Bangalore",
    emergencyContact: "+91 76543 21099",
    occupation: "Student",
    company: "IIT Hyderabad",
    idProof: "College ID",
    idNumber: "CS2023045",
    photo: ""
  }
];

export default function TenantProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<typeof tenantProfiles[0] | null>(null);

  const filteredTenants = tenantProfiles.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.room.includes(searchQuery) ||
    tenant.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Tenant Profiles</h1>
          <p className="text-muted-foreground">View detailed tenant profiles and information</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tenantProfiles.length}</p>
                <p className="text-sm text-muted-foreground">Total Profiles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tenantProfiles.filter(t => t.status === "active").length}</p>
                <p className="text-sm text-muted-foreground">Active Tenants</p>
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
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Floors Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <FileText className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tenantProfiles.length}</p>
                <p className="text-sm text-muted-foreground">Documents Verified</p>
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
              placeholder="Search by name, room, or tenant ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tenant Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="border-0 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={tenant.photo} />
                  <AvatarFallback className="bg-primary/10 text-primary text-lg">
                    {tenant.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{tenant.name}</h3>
                    <Badge variant={tenant.status === "active" ? "default" : "secondary"}>
                      {tenant.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">ID: {tenant.id}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>Room {tenant.room} - Bed {tenant.bed}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{tenant.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined: {new Date(tenant.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1" onClick={() => setSelectedTenant(tenant)}>
                      View Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Tenant Profile</DialogTitle>
                    </DialogHeader>
                    {selectedTenant && (
                      <Tabs defaultValue="personal" className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="personal">Personal</TabsTrigger>
                          <TabsTrigger value="room">Room Details</TabsTrigger>
                          <TabsTrigger value="documents">Documents</TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal" className="space-y-4 mt-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                {selectedTenant.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold">{selectedTenant.name}</h3>
                              <p className="text-muted-foreground">{selectedTenant.occupation}</p>
                              <p className="text-sm text-muted-foreground">{selectedTenant.company}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Phone</Label>
                              <p className="font-medium">{selectedTenant.phone}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Email</Label>
                              <p className="font-medium">{selectedTenant.email}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Permanent Address</Label>
                              <p className="font-medium">{selectedTenant.address}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Emergency Contact</Label>
                              <p className="font-medium">{selectedTenant.emergencyContact}</p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="room" className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Room Number</Label>
                              <p className="font-medium">{selectedTenant.room}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Bed</Label>
                              <p className="font-medium">{selectedTenant.bed}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Floor</Label>
                              <p className="font-medium">{selectedTenant.floor}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Monthly Rent</Label>
                              <p className="font-medium">₹{selectedTenant.rent.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Security Deposit</Label>
                              <p className="font-medium">₹{selectedTenant.deposit.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Join Date</Label>
                              <p className="font-medium">{new Date(selectedTenant.joinDate).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Agreement End</Label>
                              <p className="font-medium">{new Date(selectedTenant.endDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="documents" className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">ID Proof Type</Label>
                              <p className="font-medium">{selectedTenant.idProof}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">ID Number</Label>
                              <p className="font-medium">{selectedTenant.idNumber}</p>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Document files are stored securely. Contact admin to view uploaded documents.</p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
