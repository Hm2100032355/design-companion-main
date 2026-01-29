import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BedDouble, Save } from "lucide-react";

const AddEditRoom = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Add / Edit Room</h1>
          <p className="text-muted-foreground mt-1">Create or modify room details</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Save className="w-4 h-4 mr-2" />
          Save Room
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-accent" />
              Room Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomId">Room ID</Label>
                <Input id="roomId" placeholder="e.g., R001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomName">Room Name (Optional)</Label>
                <Input id="roomName" placeholder="e.g., Deluxe Room" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floor">Floor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ground">Ground Floor</SelectItem>
                    <SelectItem value="first">First Floor</SelectItem>
                    <SelectItem value="second">Second Floor</SelectItem>
                    <SelectItem value="third">Third Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sharing">Sharing Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="2-sharing">2-Sharing</SelectItem>
                    <SelectItem value="3-sharing">3-Sharing</SelectItem>
                    <SelectItem value="4-sharing">4-Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent">Monthly Rent</Label>
              <Input id="rent" placeholder="Enter rent amount" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Room Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "ac", label: "Air Conditioning" },
                { id: "fan", label: "Ceiling Fan" },
                { id: "attached", label: "Attached Bathroom" },
                { id: "balcony", label: "Balcony" },
                { id: "wardrobe", label: "Wardrobe" },
                { id: "table", label: "Study Table" },
                { id: "chair", label: "Chair" },
                { id: "window", label: "Window" },
              ].map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox id={amenity.id} />
                  <Label htmlFor={amenity.id} className="text-sm font-normal">{amenity.label}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddEditRoom;
