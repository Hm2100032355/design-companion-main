import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollText, Save, Clock, Ban, Users } from "lucide-react";

const RulesPolicies = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Rules & Policies</h1>
          <p className="text-muted-foreground mt-1">Define house rules and policies</p>
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
              <Clock className="w-5 h-5 text-accent" />
              Timings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gateOpen">Gate Opening Time</Label>
                <Input id="gateOpen" type="time" defaultValue="05:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gateClose">Gate Closing Time</Label>
                <Input id="gateClose" type="time" defaultValue="23:00" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="lateEntry">Allow Late Entry (with prior notice)</Label>
              <Switch id="lateEntry" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="nightOut">Night Out Allowed</Label>
              <Switch id="nightOut" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Visitor Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="visitors">Visitors Allowed</Label>
              <Switch id="visitors" defaultChecked />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visitorStart">Visiting Hours Start</Label>
                <Input id="visitorStart" type="time" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitorEnd">Visiting Hours End</Label>
                <Input id="visitorEnd" type="time" defaultValue="20:00" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="oppositeGender">Opposite Gender Visitors</Label>
              <Switch id="oppositeGender" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="w-5 h-5 text-accent" />
              Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: "smoking", label: "No Smoking", checked: true },
                { id: "alcohol", label: "No Alcohol", checked: true },
                { id: "pets", label: "No Pets", checked: true },
                { id: "parties", label: "No Parties", checked: true },
                { id: "loudMusic", label: "No Loud Music after 10 PM", checked: true },
                { id: "cooking", label: "No Cooking in Room", checked: true },
                { id: "drugs", label: "No Drugs", checked: true },
                { id: "weapons", label: "No Weapons", checked: true },
              ].map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <Label htmlFor={rule.id} className="text-sm cursor-pointer">{rule.label}</Label>
                  <Switch id={rule.id} defaultChecked={rule.checked} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-accent" />
              Additional Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter any additional rules or policies..."
              rows={4}
              defaultValue="1. Maintain cleanliness in common areas.
2. Report any maintenance issues immediately.
3. Rent must be paid before 5th of every month.
4. One month notice required before vacating."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RulesPolicies;
