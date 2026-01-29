import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, BedDouble, Users } from "lucide-react";

const RoomOccupancy = () => {
  const floors = [
    {
      name: "Ground Floor",
      rooms: [
        { id: "R001", beds: 3, occupied: 3, percentage: 100 },
        { id: "R002", beds: 4, occupied: 4, percentage: 100 },
        { id: "R003", beds: 2, occupied: 2, percentage: 100 },
      ],
    },
    {
      name: "First Floor",
      rooms: [
        { id: "R004", beds: 2, occupied: 1, percentage: 50 },
        { id: "R005", beds: 3, occupied: 2, percentage: 67 },
        { id: "R006", beds: 4, occupied: 3, percentage: 75 },
      ],
    },
    {
      name: "Second Floor",
      rooms: [
        { id: "R007", beds: 1, occupied: 1, percentage: 100 },
        { id: "R008", beds: 2, occupied: 0, percentage: 0 },
        { id: "R009", beds: 3, occupied: 2, percentage: 67 },
      ],
    },
  ];

  const totalBeds = floors.reduce((acc, floor) => acc + floor.rooms.reduce((a, r) => a + r.beds, 0), 0);
  const occupiedBeds = floors.reduce((acc, floor) => acc + floor.rooms.reduce((a, r) => a + r.occupied, 0), 0);
  const overallPercentage = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Room-wise Occupancy</h1>
        <p className="text-muted-foreground mt-1">View occupancy status by room and floor</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-accent" />
            Overall Occupancy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-accent">{overallPercentage}%</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-display font-bold">{occupiedBeds}</p>
                <p className="text-sm text-muted-foreground">of {totalBeds} beds</p>
              </div>
            </div>
            <Badge className={overallPercentage > 80 ? "bg-success/10 text-success border-0" : "bg-warning/10 text-warning border-0"}>
              {overallPercentage > 80 ? "High Occupancy" : "Moderate"}
            </Badge>
          </div>
          <Progress value={overallPercentage} className="h-3" />
        </CardContent>
      </Card>

      <div className="space-y-6">
        {floors.map((floor) => (
          <Card key={floor.name} className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>{floor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {floor.rooms.map((room) => (
                  <div key={room.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Room {room.id}</span>
                      <Badge variant={room.percentage === 100 ? "secondary" : "default"} className={room.percentage === 100 ? "" : "bg-accent text-accent-foreground"}>
                        {room.percentage === 100 ? "Full" : `${room.beds - room.occupied} Vacant`}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Users className="w-4 h-4" />
                      {room.occupied} / {room.beds} occupied
                    </div>
                    <Progress value={room.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomOccupancy;
