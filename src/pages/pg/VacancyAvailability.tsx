import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { DoorOpen, Save, Eye, EyeOff } from "lucide-react";

const VacancyAvailability = () => {
  const vacancyStatus = [
    { type: "Single", total: 2, vacant: 1, rent: "₹12,000" },
    { type: "2-Sharing", total: 8, vacant: 3, rent: "₹8,000" },
    { type: "3-Sharing", total: 12, vacant: 5, rent: "₹6,000" },
    { type: "4-Sharing", total: 8, vacant: 0, rent: "₹5,000" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Vacancy & Availability</h1>
          <p className="text-muted-foreground mt-1">Manage and display vacancy status</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent" />
              Listing Visibility
            </div>
            <Switch defaultChecked />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-success/10">
            <div>
              <p className="font-medium text-success">Your PG is visible to seekers</p>
              <p className="text-sm text-muted-foreground">Turn off to hide from search results</p>
            </div>
            <Badge className="bg-success text-success-foreground">Live</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DoorOpen className="w-5 h-5 text-accent" />
            Vacancy Status by Room Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vacancyStatus.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-medium">{item.type}</p>
                    <Badge variant="secondary">{item.rent}/month</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.vacant} of {item.total} beds available
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {item.vacant > 0 ? (
                    <Badge className="bg-success/10 text-success border-0">
                      {item.vacant} Vacant
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Full</Badge>
                  )}
                  <Switch defaultChecked={item.vacant > 0} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VacancyAvailability;
