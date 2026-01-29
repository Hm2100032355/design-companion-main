import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BedDouble, User, Plus } from "lucide-react";

const BedConfiguration = () => {
  const rooms = [
    {
      id: "R001",
      type: "3-Sharing",
      beds: [
        { id: "B001", status: "occupied", tenant: "Amit Kumar" },
        { id: "B002", status: "occupied", tenant: "Rahul Singh" },
        { id: "B003", status: "occupied", tenant: "Priya Sharma" },
      ],
    },
    {
      id: "R003",
      type: "2-Sharing",
      beds: [
        { id: "B007", status: "occupied", tenant: "Vikram Patel" },
        { id: "B008", status: "vacant", tenant: null },
      ],
    },
    {
      id: "R006",
      type: "2-Sharing",
      beds: [
        { id: "B011", status: "maintenance", tenant: null },
        { id: "B012", status: "maintenance", tenant: null },
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Bed Configuration</h1>
          <p className="text-muted-foreground mt-1">Manage beds in each room</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-accent" />
                  Room {room.id}
                </div>
                <Badge variant="secondary">{room.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {room.beds.map((bed) => (
                <div
                  key={bed.id}
                  className={`p-3 rounded-lg border ${
                    bed.status === "occupied"
                      ? "border-success/30 bg-success/5"
                      : bed.status === "vacant"
                      ? "border-accent/30 bg-accent/5"
                      : "border-warning/30 bg-warning/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{bed.id}</span>
                    </div>
                    {bed.status === "occupied" && (
                      <Badge className="bg-success/10 text-success border-0">Occupied</Badge>
                    )}
                    {bed.status === "vacant" && (
                      <Badge className="bg-accent/10 text-accent border-0">Vacant</Badge>
                    )}
                    {bed.status === "maintenance" && (
                      <Badge className="bg-warning/10 text-warning border-0">Maintenance</Badge>
                    )}
                  </div>
                  {bed.tenant ? (
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <User className="w-3 h-3" />
                      {bed.tenant}
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs">
                      <Plus className="w-3 h-3 mr-1" />
                      Assign Tenant
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BedConfiguration;
