import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell, Send, Save, Eye, Calendar as CalendarIcon, Clock, Users, FileText, Megaphone } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CreateNotice() {
  const [publishDate, setPublishDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();

  const noticeTypes = [
    "General Announcement",
    "Rent Reminder",
    "Maintenance Notice",
    "Event Notice",
    "Policy Update",
    "Emergency Alert",
    "Holiday Notice"
  ];

  const targetAudience = [
    { id: "all", label: "All Tenants" },
    { id: "active", label: "Active Tenants Only" },
    { id: "floor", label: "Floor-wise" },
    { id: "room", label: "Room-wise" },
    { id: "pending", label: "Pending Payments Only" }
  ];

  const priorityLevels = [
    { value: "low", label: "Low", color: "bg-blue-100 text-blue-700" },
    { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700" },
    { value: "high", label: "High", color: "bg-orange-100 text-orange-700" },
    { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            Create Notice
          </h1>
          <p className="text-muted-foreground">Create and publish announcements to tenants</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Publish Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Notice Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notice Title *</Label>
                <Input id="title" placeholder="Enter notice title (e.g., Monthly Rent Reminder)" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notice Type *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice type" />
                    </SelectTrigger>
                    <SelectContent>
                      {noticeTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex items-center gap-2">
                            <Badge className={level.color}>{level.label}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Notice Content *</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter the notice content here..."
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground">Max 500 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment (Optional)</Label>
                <Input id="attachment" type="file" accept=".pdf,.doc,.docx,.jpg,.png" />
                <p className="text-xs text-muted-foreground">Supported: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Schedule & Visibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !publishDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {publishDate ? format(publishDate, "PPP") : "Select publish date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={publishDate}
                        onSelect={setPublishDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !expiryDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={expiryDate}
                        onSelect={setExpiryDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="pin" />
                <Label htmlFor="pin" className="font-normal">Pin this notice (shows at top)</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="push" defaultChecked />
                <Label htmlFor="push" className="font-normal">Send push notification to tenants</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="email" />
                <Label htmlFor="email" className="font-normal">Also send via email</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {targetAudience.map((audience) => (
                <div key={audience.id} className="flex items-center space-x-2">
                  <Checkbox id={audience.id} defaultChecked={audience.id === "all"} />
                  <Label htmlFor={audience.id} className="font-normal">{audience.label}</Label>
                </div>
              ))}

              <div className="pt-4 border-t space-y-2">
                <Label>Select Floor (if floor-wise)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Quick Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                📢 Monthly Rent Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                🔧 Maintenance Scheduled
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                🎉 Festival Celebration
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                📋 New Rules Update
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                ⚡ Power Outage Alert
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-2">Tips for effective notices:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Keep the title clear and concise</li>
                  <li>Use appropriate priority levels</li>
                  <li>Set expiry dates for time-sensitive notices</li>
                  <li>Target the right audience</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
