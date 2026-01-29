import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  Clock,
  Users,
  Wifi,
  Car,
  UtensilsCrossed,
  Shield,
  Save,
  Edit2,
  CheckCircle,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

export default function PGSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    pgName: "Sunrise Men's PG",
    pgType: "boys",
    operationalStatus: "active",
    checkInTime: "09:00",
    checkOutTime: "11:00",
    gateClosingTime: "22:00",
    visitorAllowed: true,
    visitorTiming: "10:00 - 20:00",
    wifiAvailable: true,
    wifiSpeed: "100 Mbps",
    parkingAvailable: true,
    parkingType: "both",
    foodProvided: true,
    mealTypes: ["breakfast", "lunch", "dinner"],
    laundryService: true,
    housekeeping: "daily",
    acAvailable: true,
    powerBackup: true,
    cctv: true,
    securityGuard: true,
    biometricEntry: false,
    description:
      "A well-maintained PG with all modern amenities, located near IT parks and metro station.",
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("PG settings updated successfully!");
  };

  const handleToggle = (field: string, value: boolean) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            PG Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your PG preferences and facilities
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Settings
            </>
          )}
        </Button>
      </div>

      {/* Basic Information */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pgName">PG Name</Label>
              <Input
                id="pgName"
                value={settings.pgName}
                onChange={(e) => setSettings({ ...settings, pgName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pgType">PG Type</Label>
              <Select
                value={settings.pgType}
                onValueChange={(value) => setSettings({ ...settings, pgType: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boys">Boys PG</SelectItem>
                  <SelectItem value="girls">Girls PG</SelectItem>
                  <SelectItem value="coliving">Co-Living</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Operational Status</Label>
              <Select
                value={settings.operationalStatus}
                onValueChange={(value) => setSettings({ ...settings, operationalStatus: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="temporarily-closed">Temporarily Closed</SelectItem>
                  <SelectItem value="renovation">Under Renovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">PG Description</Label>
            <Textarea
              id="description"
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              disabled={!isEditing}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Timings */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Timings & Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-In Time</Label>
              <Input
                id="checkIn"
                type="time"
                value={settings.checkInTime}
                onChange={(e) => setSettings({ ...settings, checkInTime: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-Out Time</Label>
              <Input
                id="checkOut"
                type="time"
                value={settings.checkOutTime}
                onChange={(e) => setSettings({ ...settings, checkOutTime: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gateClosing">Gate Closing Time</Label>
              <Input
                id="gateClosing"
                type="time"
                value={settings.gateClosingTime}
                onChange={(e) => setSettings({ ...settings, gateClosingTime: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Visitors Allowed</p>
                <p className="text-sm text-muted-foreground">{settings.visitorTiming}</p>
              </div>
            </div>
            <Switch
              checked={settings.visitorAllowed}
              onCheckedChange={(checked) => handleToggle("visitorAllowed", checked)}
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Facilities & Amenities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Wi-Fi */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Wifi className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Wi-Fi</p>
                  <p className="text-sm text-muted-foreground">{settings.wifiSpeed}</p>
                </div>
              </div>
              <Switch
                checked={settings.wifiAvailable}
                onCheckedChange={(checked) => handleToggle("wifiAvailable", checked)}
                disabled={!isEditing}
              />
            </div>

            {/* Parking */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <Car className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Parking</p>
                  <p className="text-sm text-muted-foreground">Two & Four Wheeler</p>
                </div>
              </div>
              <Switch
                checked={settings.parkingAvailable}
                onCheckedChange={(checked) => handleToggle("parkingAvailable", checked)}
                disabled={!isEditing}
              />
            </div>

            {/* Food */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100">
                  <UtensilsCrossed className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Food Service</p>
                  <p className="text-sm text-muted-foreground">Breakfast, Lunch, Dinner</p>
                </div>
              </div>
              <Switch
                checked={settings.foodProvided}
                onCheckedChange={(checked) => handleToggle("foodProvided", checked)}
                disabled={!isEditing}
              />
            </div>

            {/* Laundry */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Laundry Service</p>
                  <p className="text-sm text-muted-foreground">Available</p>
                </div>
              </div>
              <Switch
                checked={settings.laundryService}
                onCheckedChange={(checked) => handleToggle("laundryService", checked)}
                disabled={!isEditing}
              />
            </div>

            {/* AC */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-100">
                  <Settings className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium">AC Rooms</p>
                  <p className="text-sm text-muted-foreground">Available in select rooms</p>
                </div>
              </div>
              <Switch
                checked={settings.acAvailable}
                onCheckedChange={(checked) => handleToggle("acAvailable", checked)}
                disabled={!isEditing}
              />
            </div>

            {/* Power Backup */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <Settings className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Power Backup</p>
                  <p className="text-sm text-muted-foreground">Generator & Inverter</p>
                </div>
              </div>
              <Switch
                checked={settings.powerBackup}
                onCheckedChange={(checked) => handleToggle("powerBackup", checked)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">CCTV Surveillance</p>
                <p className="text-sm text-muted-foreground">24/7 monitoring</p>
              </div>
              <Switch
                checked={settings.cctv}
                onCheckedChange={(checked) => handleToggle("cctv", checked)}
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Security Guard</p>
                <p className="text-sm text-muted-foreground">Round the clock</p>
              </div>
              <Switch
                checked={settings.securityGuard}
                onCheckedChange={(checked) => handleToggle("securityGuard", checked)}
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Biometric Entry</p>
                <p className="text-sm text-muted-foreground">Fingerprint access</p>
              </div>
              <Switch
                checked={settings.biometricEntry}
                onCheckedChange={(checked) => handleToggle("biometricEntry", checked)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
