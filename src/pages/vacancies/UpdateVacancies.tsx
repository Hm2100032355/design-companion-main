import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const roomData = [
  { id: 1, room: "101", floor: "Floor 1", sharing: "2-Sharing", totalBeds: 2, occupied: 1, status: "Available" },
  { id: 2, room: "102", floor: "Floor 1", sharing: "3-Sharing", totalBeds: 3, occupied: 3, status: "Full" },
  { id: 3, room: "201", floor: "Floor 2", sharing: "2-Sharing", totalBeds: 2, occupied: 1, status: "Available" },
  { id: 4, room: "202", floor: "Floor 2", sharing: "4-Sharing", totalBeds: 4, occupied: 2, status: "Available" },
  { id: 5, room: "203", floor: "Floor 2", sharing: "Single", totalBeds: 1, occupied: 1, status: "Full" },
  { id: 6, room: "301", floor: "Floor 3", sharing: "3-Sharing", totalBeds: 3, occupied: 1, status: "Available" },
];

const UpdateVacancies = () => {
  const [rooms, setRooms] = useState(roomData);

  const handleStatusChange = (roomId: number, newStatus: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    ));
  };

  const handleOccupiedChange = (roomId: number, value: string) => {
    const occupied = parseInt(value) || 0;
    setRooms(rooms.map(room => {
      if (room.id === roomId) {
        const newOccupied = Math.min(occupied, room.totalBeds);
        return { 
          ...room, 
          occupied: newOccupied,
          status: newOccupied >= room.totalBeds ? "Full" : "Available"
        };
      }
      return room;
    }));
  };

  const handleSave = () => {
    toast.success("Vacancy status updated successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Update Vacancies</h1>
          <p className="text-muted-foreground">Update vacancy status for rooms and beds</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Quick Update Section */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Quick Update</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Select Room</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(room => (
                    <SelectItem key={room.id} value={room.room}>
                      Room {room.room} - {room.floor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sharing Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Sharing</SelectItem>
                  <SelectItem value="double">2-Sharing</SelectItem>
                  <SelectItem value="triple">3-Sharing</SelectItem>
                  <SelectItem value="quad">4-Sharing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Room-wise Update Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Room-wise Vacancy Update</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Sharing Type</TableHead>
                <TableHead>Total Beds</TableHead>
                <TableHead>Occupied Beds</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.room}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.sharing}</TableCell>
                  <TableCell>{room.totalBeds}</TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      min={0}
                      max={room.totalBeds}
                      value={room.occupied}
                      onChange={(e) => handleOccupiedChange(room.id, e.target.value)}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>{room.totalBeds - room.occupied}</TableCell>
                  <TableCell>
                    <Select 
                      value={room.status.toLowerCase()}
                      onValueChange={(value) => handleStatusChange(room.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Update */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Bulk Update by Floor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Select Floor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="floor1">Floor 1</SelectItem>
                  <SelectItem value="floor2">Floor 2</SelectItem>
                  <SelectItem value="floor3">Floor 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Mark All Rooms As</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="secondary" className="w-full">Apply to Floor</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateVacancies;
