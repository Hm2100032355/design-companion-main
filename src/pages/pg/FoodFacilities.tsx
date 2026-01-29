import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Save, Clock } from "lucide-react";

const FoodFacilities = () => {
  const mealTimings = [
    { meal: "Breakfast", time: "7:30 AM - 9:30 AM", enabled: true },
    { meal: "Lunch", time: "12:30 PM - 2:30 PM", enabled: true },
    { meal: "Snacks", time: "5:00 PM - 6:00 PM", enabled: false },
    { meal: "Dinner", time: "8:00 PM - 10:00 PM", enabled: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Food Facilities</h1>
          <p className="text-muted-foreground mt-1">Manage food and dining options</p>
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
              <UtensilsCrossed className="w-5 h-5 text-accent" />
              Food Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="foodIncluded">Food Included in Rent</Label>
              <Switch id="foodIncluded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="vegOnly">Vegetarian Only</Label>
              <Switch id="vegOnly" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="nonVeg">Non-Veg Available</Label>
              <Switch id="nonVeg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foodCharges">Monthly Food Charges (if separate)</Label>
              <Input id="foodCharges" placeholder="Enter amount" defaultValue="₹3,500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Meal Timings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mealTimings.map((meal) => (
              <div key={meal.meal} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{meal.meal}</p>
                  <p className="text-sm text-muted-foreground">{meal.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  {meal.enabled ? (
                    <Badge className="bg-success/10 text-success border-0">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                  <Switch defaultChecked={meal.enabled} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodFacilities;
