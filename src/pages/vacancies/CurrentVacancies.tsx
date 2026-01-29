import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DoorOpen, Bed, Users, RefreshCw } from "lucide-react";

const vacancyData = [
  { sharingType: "Single Sharing", totalBeds: 6, occupied: 5, available: 1, status: "available" },
  { sharingType: "2-Sharing", totalBeds: 12, occupied: 9, available: 3, status: "available" },
  { sharingType: "3-Sharing", totalBeds: 18, occupied: 13, available: 5, status: "available" },
  { sharingType: "4-Sharing", totalBeds: 12, occupied: 12, available: 0, status: "full" },
];

const roomWiseVacancy = [
  { room: "101", floor: "Floor 1", sharing: "2-Sharing", totalBeds: 2, occupied: 1, available: 1, rent: "₹8,000", status: "Available" },
  { room: "102", floor: "Floor 1", sharing: "3-Sharing", totalBeds: 3, occupied: 3, available: 0, rent: "₹6,500", status: "Full" },
  { room: "201", floor: "Floor 2", sharing: "2-Sharing", totalBeds: 2, occupied: 1, available: 1, rent: "₹8,500", status: "Available" },
  { room: "202", floor: "Floor 2", sharing: "4-Sharing", totalBeds: 4, occupied: 2, available: 2, rent: "₹5,500", status: "Available" },
  { room: "203", floor: "Floor 2", sharing: "Single", totalBeds: 1, occupied: 1, available: 0, rent: "₹12,000", status: "Full" },
  { room: "301", floor: "Floor 3", sharing: "3-Sharing", totalBeds: 3, occupied: 1, available: 2, rent: "₹6,500", status: "Available" },
];

const CurrentVacancies = () => {
  const totalBeds = vacancyData.reduce((acc, v) => acc + v.totalBeds, 0);
  const occupiedBeds = vacancyData.reduce((acc, v) => acc + v.occupied, 0);
  const availableBeds = vacancyData.reduce((acc, v) => acc + v.available, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Current Vacancies</h1>
          <p className="text-muted-foreground">View real-time vacancy status across all rooms and sharing types</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bed className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Beds</p>
                <p className="text-2xl font-bold">{totalBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupied Beds</p>
                <p className="text-2xl font-bold">{occupiedBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DoorOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Beds</p>
                <p className="text-2xl font-bold">{availableBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold">{occupancyRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vacancy by Sharing Type */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Vacancy by Sharing Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vacancyData.map((item) => (
              <div key={item.sharingType} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.sharingType}</span>
                  <Badge variant={item.status === "full" ? "destructive" : "default"}>
                    {item.status === "full" ? "Full" : `${item.available} Available`}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Total: {item.totalBeds} beds</p>
                  <p>Occupied: {item.occupied} beds</p>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(item.occupied / item.totalBeds) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Room-wise Vacancy Table */}
      <Card className="border-0 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Room-wise Vacancy Details</CardTitle>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="floor1">Floor 1</SelectItem>
                <SelectItem value="floor2">Floor 2</SelectItem>
                <SelectItem value="floor3">Floor 3</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="full">Full</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead>Sharing Type</TableHead>
                <TableHead>Total Beds</TableHead>
                <TableHead>Occupied</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Rent/Bed</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomWiseVacancy.map((room) => (
                <TableRow key={room.room}>
                  <TableCell className="font-medium">{room.room}</TableCell>
                  <TableCell>{room.floor}</TableCell>
                  <TableCell>{room.sharing}</TableCell>
                  <TableCell>{room.totalBeds}</TableCell>
                  <TableCell>{room.occupied}</TableCell>
                  <TableCell>{room.available}</TableCell>
                  <TableCell>{room.rent}</TableCell>
                  <TableCell>
                    <Badge variant={room.status === "Full" ? "secondary" : "default"}>
                      {room.status}
                    </Badge>
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

export default CurrentVacancies;
