import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IndianRupee,
  Calendar,
  Bell,
  CreditCard,
  Save,
  Edit2,
  Plus,
  Percent,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function RentSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState({
    rentDueDate: "5",
    gracePeriod: "5",
    lateFee: "100",
    lateFeeType: "fixed",
    reminderDays: ["3", "1", "0"],
    autoReminder: true,
    advanceMonths: "1",
    securityDepositMonths: "2",
    maintenanceCharges: "500",
    maintenanceIncluded: false,
    electricityCharges: "included",
    waterCharges: "included",
    acceptOnlinePayment: true,
    acceptCash: true,
    acceptCheque: false,
    upiId: "pgowner@upi",
    bankAccount: "XXXX1234",
    bankName: "HDFC Bank",
    ifscCode: "HDFC0001234",
  });

  const sharingRates = [
    { type: "Single Sharing", baseRent: 12000, acRent: 15000 },
    { type: "Double Sharing", baseRent: 8000, acRent: 10000 },
    { type: "Triple Sharing", baseRent: 6000, acRent: 8000 },
    { type: "Four Sharing", baseRent: 5000, acRent: 7000 },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Rent settings updated successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <IndianRupee className="h-6 w-6 text-primary" />
            Rent Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure rent collection and payment preferences
          </p>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Settings
            </>
          )}
        </Button>
      </div>

      {/* Rent Rates */}
      <Card className="border-0 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            Rent Rates by Sharing Type
          </CardTitle>
          {isEditing && (
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Rate
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sharing Type</TableHead>
                <TableHead>Non-AC Rent (₹)</TableHead>
                <TableHead>AC Rent (₹)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sharingRates.map((rate) => (
                <TableRow key={rate.type}>
                  <TableCell className="font-medium">{rate.type}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="number"
                        defaultValue={rate.baseRent}
                        className="w-28"
                      />
                    ) : (
                      `₹${rate.baseRent.toLocaleString()}`
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Input
                        type="number"
                        defaultValue={rate.acRent}
                        className="w-28"
                      />
                    ) : (
                      `₹${rate.acRent.toLocaleString()}`
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Due Date & Late Fee */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Due Date Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Rent Due Date</Label>
              <Select
                value={settings.rentDueDate}
                onValueChange={(value) => setSettings({ ...settings, rentDueDate: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 5, 10, 15].map((day) => (
                    <SelectItem key={day} value={String(day)}>
                      {day}th of every month
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gracePeriod">Grace Period (Days)</Label>
              <Input
                id="gracePeriod"
                type="number"
                value={settings.gracePeriod}
                onChange={(e) => setSettings({ ...settings, gracePeriod: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Late Fee Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lateFeeType">Late Fee Type</Label>
              <Select
                value={settings.lateFeeType}
                onValueChange={(value) => setSettings({ ...settings, lateFeeType: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                  <SelectItem value="percentage">Percentage of Rent</SelectItem>
                  <SelectItem value="perday">Per Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lateFee">
                Late Fee Amount {settings.lateFeeType === "percentage" && "(%)"}
              </Label>
              <div className="relative">
                {settings.lateFeeType !== "percentage" && (
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                {settings.lateFeeType === "percentage" && (
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
                <Input
                  id="lateFee"
                  type="number"
                  value={settings.lateFee}
                  onChange={(e) => setSettings({ ...settings, lateFee: e.target.value })}
                  disabled={!isEditing}
                  className="pl-9"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reminders */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Payment Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Automatic Reminders</p>
              <p className="text-sm text-muted-foreground">
                Send SMS/Email reminders before due date
              </p>
            </div>
            <Switch
              checked={settings.autoReminder}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, autoReminder: checked })
              }
              disabled={!isEditing}
            />
          </div>
          {settings.autoReminder && (
            <div className="space-y-2">
              <Label>Reminder Days Before Due Date</Label>
              <div className="flex gap-2">
                {["7", "5", "3", "1", "0"].map((day) => (
                  <Button
                    key={day}
                    variant={settings.reminderDays.includes(day) ? "default" : "outline"}
                    size="sm"
                    disabled={!isEditing}
                    onClick={() => {
                      if (settings.reminderDays.includes(day)) {
                        setSettings({
                          ...settings,
                          reminderDays: settings.reminderDays.filter((d) => d !== day),
                        });
                      } else {
                        setSettings({
                          ...settings,
                          reminderDays: [...settings.reminderDays, day],
                        });
                      }
                    }}
                  >
                    {day === "0" ? "Due Date" : `${day} days`}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Charges */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Additional Charges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="maintenance">Maintenance Charges (₹/month)</Label>
              <Input
                id="maintenance"
                type="number"
                value={settings.maintenanceCharges}
                onChange={(e) =>
                  setSettings({ ...settings, maintenanceCharges: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="electricity">Electricity Charges</Label>
              <Select
                value={settings.electricityCharges}
                onValueChange={(value) =>
                  setSettings({ ...settings, electricityCharges: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="included">Included in Rent</SelectItem>
                  <SelectItem value="meter">As per Meter</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="water">Water Charges</Label>
              <Select
                value={settings.waterCharges}
                onValueChange={(value) => setSettings({ ...settings, waterCharges: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="included">Included in Rent</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Online Payment</p>
                <p className="text-sm text-muted-foreground">UPI, Cards, Net Banking</p>
              </div>
              <Switch
                checked={settings.acceptOnlinePayment}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, acceptOnlinePayment: checked })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cash Payment</p>
                <p className="text-sm text-muted-foreground">Manual collection</p>
              </div>
              <Switch
                checked={settings.acceptCash}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, acceptCash: checked })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Cheque Payment</p>
                <p className="text-sm text-muted-foreground">Bank cheque</p>
              </div>
              <Switch
                checked={settings.acceptCheque}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, acceptCheque: checked })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          {settings.acceptOnlinePayment && (
            <div className="grid gap-4 md:grid-cols-2 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="upi">UPI ID</Label>
                <Input
                  id="upi"
                  value={settings.upiId}
                  onChange={(e) => setSettings({ ...settings, upiId: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank">Bank Account Number</Label>
                <Input
                  id="bank"
                  value={settings.bankAccount}
                  onChange={(e) => setSettings({ ...settings, bankAccount: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={settings.bankName}
                  onChange={(e) => setSettings({ ...settings, bankName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ifsc">IFSC Code</Label>
                <Input
                  id="ifsc"
                  value={settings.ifscCode}
                  onChange={(e) => setSettings({ ...settings, ifscCode: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
