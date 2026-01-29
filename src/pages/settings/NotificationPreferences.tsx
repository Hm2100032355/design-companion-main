import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Save,
  CreditCard,
  Users,
  AlertTriangle,
  Calendar,
  Wrench,
  FileText,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  email: boolean;
  sms: boolean;
  push: boolean;
}

export default function NotificationPreferences() {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: "booking",
      title: "New Booking Requests",
      description: "Get notified when a new booking request is received",
      icon: <Users className="h-5 w-5" />,
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "payment",
      title: "Payment Received",
      description: "Notifications when rent or other payments are received",
      icon: <CreditCard className="h-5 w-5" />,
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "payment_due",
      title: "Payment Due Reminders",
      description: "Reminders about upcoming or overdue payments",
      icon: <AlertTriangle className="h-5 w-5" />,
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "complaint",
      title: "New Complaints",
      description: "Alerts when tenants raise new complaints",
      icon: <Wrench className="h-5 w-5" />,
      email: true,
      sms: true,
      push: true,
    },
    {
      id: "tenant_move",
      title: "Tenant Check-in/Check-out",
      description: "Updates about tenant move-in and move-out",
      icon: <Calendar className="h-5 w-5" />,
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "review",
      title: "New Reviews",
      description: "Notifications when tenants leave reviews",
      icon: <Star className="h-5 w-5" />,
      email: true,
      sms: false,
      push: true,
    },
    {
      id: "notice",
      title: "Notice Updates",
      description: "Updates about notices and announcements",
      icon: <FileText className="h-5 w-5" />,
      email: false,
      sms: false,
      push: true,
    },
  ]);

  const [generalSettings, setGeneralSettings] = useState({
    emailDigest: "daily",
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    marketingEmails: false,
    systemAlerts: true,
  });

  const handleToggle = (id: string, channel: "email" | "sms" | "push", value: boolean) => {
    setNotificationSettings((prev) =>
      prev.map((setting) =>
        setting.id === id ? { ...setting, [channel]: value } : setting
      )
    );
  };

  const handleSave = () => {
    toast.success("Notification preferences saved successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Notification Preferences
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage how you receive notifications and alerts
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>

      {/* Notification Channels Legend */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Email</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-100">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-medium">SMS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-100">
                <Smartphone className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm font-medium">Push Notification</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Categories */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Notification Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationSettings.map((setting) => (
            <div
              key={setting.id}
              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {setting.icon}
                </div>
                <div>
                  <p className="font-medium">{setting.title}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    checked={setting.email}
                    onCheckedChange={(checked) => handleToggle(setting.id, "email", checked)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    checked={setting.sms}
                    onCheckedChange={(checked) => handleToggle(setting.id, "sms", checked)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    checked={setting.push}
                    onCheckedChange={(checked) => handleToggle(setting.id, "push", checked)}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Email Digest Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Digest
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Daily Summary Email</p>
              <p className="text-sm text-muted-foreground">
                Receive a daily summary of all activities
              </p>
            </div>
            <Select
              value={generalSettings.emailDigest}
              onValueChange={(value) =>
                setGeneralSettings({ ...generalSettings, emailDigest: value })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quiet Hours</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Enable Quiet Hours</p>
              <p className="text-sm text-muted-foreground">
                Pause push notifications during specific hours
              </p>
            </div>
            <Switch
              checked={generalSettings.quietHoursEnabled}
              onCheckedChange={(checked) =>
                setGeneralSettings({ ...generalSettings, quietHoursEnabled: checked })
              }
            />
          </div>
          {generalSettings.quietHoursEnabled && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quietStart">Start Time</Label>
                <input
                  type="time"
                  id="quietStart"
                  value={generalSettings.quietHoursStart}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, quietHoursStart: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quietEnd">End Time</Label>
                <input
                  type="time"
                  id="quietEnd"
                  value={generalSettings.quietHoursEnd}
                  onChange={(e) =>
                    setGeneralSettings({ ...generalSettings, quietHoursEnd: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Other Preferences */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Other Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">
                Receive tips, updates, and promotional offers
              </p>
            </div>
            <Switch
              checked={generalSettings.marketingEmails}
              onCheckedChange={(checked) =>
                setGeneralSettings({ ...generalSettings, marketingEmails: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">System Alerts</p>
              <p className="text-sm text-muted-foreground">
                Important system updates and security alerts
              </p>
            </div>
            <Switch
              checked={generalSettings.systemAlerts}
              onCheckedChange={(checked) =>
                setGeneralSettings({ ...generalSettings, systemAlerts: checked })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
