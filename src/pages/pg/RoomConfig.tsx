import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Save, Plus } from "lucide-react";

const RoomConfig = () => {
  const sharingTypes = [
    { type: "Single", beds: 1, rooms: 2, rent: "₹12,000" },
    { type: "2-Sharing", beds: 2, rooms: 4, rent: "₹8,000" },
    { type: "3-Sharing", beds: 3, rooms: 4, rent: "₹6,000" },
    { type: "4-Sharing", beds: 4, rooms: 2, rent: "₹5,000" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Room & Bed Configuration</h1>
          <p className="text-muted-foreground mt-1">Configure room types and bed arrangements</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Room Type
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sharingTypes.map((sharing) => (
          <Card key={sharing.type} className="border-0 shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{sharing.type}</span>
                <Badge variant="secondary">{sharing.rooms} rooms</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <BedDouble className="w-4 h-4" />
                <span className="text-sm">{sharing.beds} bed(s) per room</span>
              </div>
              <div className="text-xl font-display font-bold text-accent">
                {sharing.rent}
                <span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <Button variant="outline" className="w-full">Edit Configuration</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-accent" />
            Default Bed Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedType">Default Bed Type</Label>
              <Input id="bedType" placeholder="e.g., Single Cot" defaultValue="Single Cot" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mattress">Mattress Type</Label>
              <Input id="mattress" placeholder="e.g., Foam Mattress" defaultValue="Memory Foam" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedding">Bedding Included</Label>
              <Input id="bedding" placeholder="e.g., Pillow, Bedsheet" defaultValue="Pillow, Bedsheet, Blanket" />
            </div>
          </div>
          <Button className="bg-accent hover:bg-accent/90">
            <Save className="w-4 h-4 mr-2" />
            Save Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomConfig;
