import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BedDouble, Plus, Search, Edit, Eye } from "lucide-react";

const RoomList = () => {
  const rooms = [
    { id: "R001", floor: "Ground", type: "3-Sharing", beds: 3, occupied: 3, rent: "₹6,000", status: "full" },
    { id: "R002", floor: "Ground", type: "4-Sharing", beds: 4, occupied: 4, rent: "₹5,000", status: "full" },
    { id: "R003", floor: "First", type: "2-Sharing", beds: 2, occupied: 1, rent: "₹8,000", status: "available" },
    { id: "R004", floor: "First", type: "3-Sharing", beds: 3, occupied: 2, rent: "₹6,000", status: "available" },
    { id: "R005", floor: "Second", type: "Single", beds: 1, occupied: 1, rent: "₹12,000", status: "full" },
    { id: "R006", floor: "Second", type: "2-Sharing", beds: 2, occupied: 0, rent: "₹8,000", status: "maintenance" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Room List</h1>
          <p className="text-muted-foreground mt-1">View and manage all rooms</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Room
        </Button>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-accent" />
              All Rooms ({rooms.length})
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search rooms..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room ID</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Beds</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.id}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.beds}</TableCell>
                  <TableCell>{room.occupied}/{room.beds}</TableCell>
                  <TableCell>{room.rent}</TableCell>
                  <TableCell>
                    {room.status === "full" && <Badge variant="secondary">Full</Badge>}
                    {room.status === "available" && <Badge className="bg-success/10 text-success border-0">Available</Badge>}
                    {room.status === "maintenance" && <Badge className="bg-warning/10 text-warning border-0">Maintenance</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomList;
