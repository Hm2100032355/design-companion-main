import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building, Save, Layers } from "lucide-react";

const PropertyStructure = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Property Structure</h1>
          <p className="text-muted-foreground mt-1">Define your property layout and structure</p>
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
              <Building className="w-5 h-5 text-accent" />
              Building Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floors">Number of Floors</Label>
                <Input id="floors" type="number" placeholder="Enter floors" defaultValue="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalRooms">Total Rooms</Label>
                <Input id="totalRooms" type="number" placeholder="Enter rooms" defaultValue="12" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Common Bathrooms</Label>
                <Input id="bathrooms" type="number" placeholder="Enter count" defaultValue="6" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kitchens">Kitchens</Label>
                <Input id="kitchens" type="number" placeholder="Enter count" defaultValue="1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sqft">Total Area (sq. ft.)</Label>
              <Input id="sqft" type="number" placeholder="Enter area" defaultValue="5000" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent" />
              Common Areas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "lobby", label: "Lobby / Reception" },
                { id: "dining", label: "Dining Hall" },
                { id: "study", label: "Study Room" },
                { id: "recreation", label: "Recreation Room" },
                { id: "gym", label: "Gym" },
                { id: "terrace", label: "Terrace" },
                { id: "parking", label: "Parking Area" },
                { id: "laundry", label: "Laundry Room" },
              ].map((area) => (
                <div key={area.id} className="flex items-center space-x-2">
                  <Checkbox id={area.id} defaultChecked={["lobby", "dining", "terrace", "parking"].includes(area.id)} />
                  <Label htmlFor={area.id} className="text-sm font-normal">{area.label}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyStructure;
