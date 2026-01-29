import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Save } from "lucide-react";

const BasicPGInfo = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Basic PG Information</h1>
          <p className="text-muted-foreground mt-1">Manage your PG/Hostel basic details</p>
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
              <Building2 className="w-5 h-5 text-accent" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pgName">PG / Hostel Name</Label>
              <Input id="pgName" placeholder="Enter PG name" defaultValue="Sunrise Men's PG" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pgType">Property Type</Label>
              <Select defaultValue="boys">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boys">Boys PG</SelectItem>
                  <SelectItem value="girls">Girls PG</SelectItem>
                  <SelectItem value="coed">Co-ed PG</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your PG" rows={4} defaultValue="A comfortable and well-maintained PG with all modern amenities." />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Registration Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="regNo">Registration Number</Label>
              <Input id="regNo" placeholder="Enter registration number" defaultValue="PG-HYD-2024-001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gstNo">GST Number (Optional)</Label>
              <Input id="gstNo" placeholder="Enter GST number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="establishedYear">Year Established</Label>
              <Input id="establishedYear" type="number" placeholder="Enter year" defaultValue="2020" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Total Capacity (Beds)</Label>
              <Input id="capacity" type="number" placeholder="Enter capacity" defaultValue="48" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BasicPGInfo;
