import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Wifi, Car, Droplets, Zap, Shield, Shirt, Tv, Wind, Save } from "lucide-react";

const Amenities = () => {
  const amenityCategories = [
    {
      title: "Basic Amenities",
      icon: Zap,
      items: [
        { id: "electricity", label: "24/7 Electricity", checked: true },
        { id: "water", label: "24/7 Water Supply", checked: true },
        { id: "wifi", label: "High-Speed WiFi", checked: true },
        { id: "hotwater", label: "Hot Water (Geyser)", checked: true },
      ],
    },
    {
      title: "Room Amenities",
      icon: Tv,
      items: [
        { id: "ac", label: "Air Conditioning", checked: false },
        { id: "fan", label: "Ceiling Fan", checked: true },
        { id: "tv", label: "Television", checked: false },
        { id: "wardrobe", label: "Wardrobe", checked: true },
        { id: "attached", label: "Attached Bathroom", checked: false },
      ],
    },
    {
      title: "Services",
      icon: Shirt,
      items: [
        { id: "laundry", label: "Laundry Service", checked: true },
        { id: "housekeeping", label: "Housekeeping", checked: true },
        { id: "ironing", label: "Ironing Service", checked: false },
        { id: "roomservice", label: "Room Service", checked: false },
      ],
    },
    {
      title: "Facilities",
      icon: Car,
      items: [
        { id: "parking", label: "Parking Space", checked: true },
        { id: "gym", label: "Gym", checked: false },
        { id: "recreation", label: "Recreation Room", checked: true },
        { id: "study", label: "Study Room", checked: false },
      ],
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        { id: "cctv", label: "CCTV Surveillance", checked: true },
        { id: "security", label: "Security Guard", checked: true },
        { id: "biometric", label: "Biometric Entry", checked: false },
        { id: "fireextinguisher", label: "Fire Extinguisher", checked: true },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Amenities & Facilities</h1>
          <p className="text-muted-foreground mt-1">Manage available amenities and facilities</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenityCategories.map((category) => (
          <Card key={category.title} className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="w-5 h-5 text-accent" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {category.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox id={item.id} defaultChecked={item.checked} />
                  <Label htmlFor={item.id} className="text-sm font-normal cursor-pointer">
                    {item.label}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
