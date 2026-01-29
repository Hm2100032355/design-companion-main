import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Save, Phone, Mail, MapPin } from "lucide-react";

const OwnerContact = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Owner & Contact Details</h1>
          <p className="text-muted-foreground mt-1">Manage owner and contact information</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              Owner Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input id="ownerName" placeholder="Enter owner name" defaultValue="Rajesh Kumar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Phone Number</Label>
              <Input id="ownerPhone" placeholder="Enter phone number" defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerEmail">Email Address</Label>
              <Input id="ownerEmail" type="email" placeholder="Enter email" defaultValue="rajesh@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerAddress">Residential Address</Label>
              <Input id="ownerAddress" placeholder="Enter address" defaultValue="123, Owner Colony, Hyderabad" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              Contact Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showPhone">Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">Display phone on listing</p>
              </div>
              <Switch id="showPhone" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showEmail">Show Email</Label>
                <p className="text-sm text-muted-foreground">Display email on listing</p>
              </div>
              <Switch id="showEmail" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp">WhatsApp Enquiries</Label>
                <p className="text-sm text-muted-foreground">Allow WhatsApp messages</p>
              </div>
              <Switch id="whatsapp" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altPhone">Alternative Contact</Label>
              <Input id="altPhone" placeholder="Enter alternative number" defaultValue="+91 98765 12345" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Caretaker / Manager Details (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="caretakerName">Caretaker Name</Label>
                <Input id="caretakerName" placeholder="Enter name" defaultValue="Suresh" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caretakerPhone">Phone Number</Label>
                <Input id="caretakerPhone" placeholder="Enter phone" defaultValue="+91 87654 32109" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caretakerRole">Role</Label>
                <Input id="caretakerRole" placeholder="Enter role" defaultValue="Warden" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerContact;
