import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Bed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const initialSharingTypes = [
  { id: 1, name: "Single Sharing", beds: 1, baseRent: 12000, totalRooms: 6, active: true },
  { id: 2, name: "Double Sharing (2-Sharing)", beds: 2, baseRent: 8000, totalRooms: 8, active: true },
  { id: 3, name: "Triple Sharing (3-Sharing)", beds: 3, baseRent: 6500, totalRooms: 6, active: true },
  { id: 4, name: "Four Sharing (4-Sharing)", beds: 4, baseRent: 5500, totalRooms: 4, active: true },
  { id: 5, name: "Five Sharing (5-Sharing)", beds: 5, baseRent: 4500, totalRooms: 2, active: false },
];

const SharingType = () => {
  const [sharingTypes, setSharingTypes] = useState(initialSharingTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newType, setNewType] = useState({ name: "", beds: 1, baseRent: 0 });

  const handleToggleActive = (id: number) => {
    setSharingTypes(sharingTypes.map(type => 
      type.id === id ? { ...type, active: !type.active } : type
    ));
    toast.success("Sharing type status updated!");
  };

  const handleAddType = () => {
    if (!newType.name || !newType.baseRent) {
      toast.error("Please fill all fields");
      return;
    }
    setSharingTypes([...sharingTypes, {
      id: sharingTypes.length + 1,
      name: newType.name,
      beds: newType.beds,
      baseRent: newType.baseRent,
      totalRooms: 0,
      active: true
    }]);
    setNewType({ name: "", beds: 1, baseRent: 0 });
    setIsDialogOpen(false);
    toast.success("New sharing type added!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Sharing Type Management</h1>
          <p className="text-muted-foreground">Configure room sharing types and base rent prices</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Sharing Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Sharing Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Sharing Type Name</Label>
                <Input 
                  placeholder="e.g., Six Sharing"
                  value={newType.name}
                  onChange={(e) => setNewType({...newType, name: e.target.value})}
                />
              </div>
              <div>
                <Label>Number of Beds</Label>
                <Input 
                  type="number"
                  min={1}
                  max={10}
                  value={newType.beds}
                  onChange={(e) => setNewType({...newType, beds: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <Label>Base Rent per Bed (₹)</Label>
                <Input 
                  type="number"
                  placeholder="Enter base rent"
                  value={newType.baseRent || ""}
                  onChange={(e) => setNewType({...newType, baseRent: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddType}>Add Type</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {sharingTypes.filter(t => t.active).map(type => (
          <Card key={type.id} className="border-0 shadow-card">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: type.beds }).map((_, i) => (
                  <Bed key={i} className="h-4 w-4 text-primary" />
                ))}
              </div>
              <p className="font-medium text-sm">{type.name}</p>
              <p className="text-lg font-bold text-primary">₹{type.baseRent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{type.totalRooms} rooms</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sharing Types Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>All Sharing Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sharing Type</TableHead>
                <TableHead>Beds per Room</TableHead>
                <TableHead>Base Rent/Bed</TableHead>
                <TableHead>Total Rooms</TableHead>
                <TableHead>Total Beds</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sharingTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell>{type.beds}</TableCell>
                  <TableCell>₹{type.baseRent.toLocaleString()}</TableCell>
                  <TableCell>{type.totalRooms}</TableCell>
                  <TableCell>{type.totalRooms * type.beds}</TableCell>
                  <TableCell>
                    <Badge variant={type.active ? "default" : "secondary"}>
                      {type.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={type.active}
                      onCheckedChange={() => handleToggleActive(type.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pricing Guidelines */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Pricing Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Standard Pricing Logic</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Single Sharing: Highest rent (private room)</li>
                <li>• As sharing increases, rent per bed decreases</li>
                <li>• AC rooms typically ₹1,000–2,000 extra</li>
                <li>• Attached washroom adds ₹500–1,000</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Room Categories</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <Badge variant="outline">Budget</Badge> Base pricing</li>
                <li>• <Badge variant="outline">Standard</Badge> +10-15% over base</li>
                <li>• <Badge variant="outline">Premium</Badge> +25-40% over base</li>
                <li>• <Badge variant="outline">Luxury</Badge> +50%+ over base</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharingType;
