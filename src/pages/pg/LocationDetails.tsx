import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Save, Navigation } from "lucide-react";

const LocationDetails = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Location Details</h1>
          <p className="text-muted-foreground mt-1">Manage your property location and address</p>
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
              <MapPin className="w-5 h-5 text-accent" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" placeholder="Enter complete address" defaultValue="123, Street Name, Near Landmark" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Enter city" defaultValue="Hyderabad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="Enter state" defaultValue="Telangana" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" placeholder="Enter pincode" defaultValue="500081" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Locality / Area</Label>
                <Input id="area" placeholder="Enter area" defaultValue="Madhapur" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-accent" />
              Nearby Landmarks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="landmark1">Nearby Landmark 1</Label>
              <Input id="landmark1" placeholder="e.g., Metro Station" defaultValue="Hitech City Metro Station" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landmark2">Nearby Landmark 2</Label>
              <Input id="landmark2" placeholder="e.g., Hospital" defaultValue="Apollo Hospital" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input id="latitude" placeholder="Enter latitude" defaultValue="17.4435" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input id="longitude" placeholder="Enter longitude" defaultValue="78.3772" />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Set Location on Map
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationDetails;
