import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Search, Filter, Eye, Edit, Trash2, Pin, Users, Calendar, Megaphone, PauseCircle, CheckCircle } from "lucide-react";

export default function ActiveNotices() {
  const activeNotices = [
    {
      id: 1,
      title: "Monthly Rent Reminder - January 2025",
      type: "Rent Reminder",
      priority: "high",
      publishedDate: "2025-01-01",
      expiryDate: "2025-01-10",
      audience: "All Tenants",
      views: 34,
      isPinned: true,
      status: "active"
    },
    {
      id: 2,
      title: "Water Supply Maintenance on 25th Jan",
      type: "Maintenance Notice",
      priority: "urgent",
      publishedDate: "2025-01-20",
      expiryDate: "2025-01-25",
      audience: "All Tenants",
      views: 28,
      isPinned: false,
      status: "active"
    },
    {
      id: 3,
      title: "New Wi-Fi Password Update",
      type: "General Announcement",
      priority: "medium",
      publishedDate: "2025-01-15",
      expiryDate: null,
      audience: "All Tenants",
      views: 42,
      isPinned: false,
      status: "active"
    },
    {
      id: 4,
      title: "Republic Day Celebration",
      type: "Event Notice",
      priority: "low",
      publishedDate: "2025-01-22",
      expiryDate: "2025-01-26",
      audience: "All Tenants",
      views: 15,
      isPinned: true,
      status: "active"
    },
    {
      id: 5,
      title: "Updated Entry/Exit Timings",
      type: "Policy Update",
      priority: "high",
      publishedDate: "2025-01-10",
      expiryDate: null,
      audience: "Active Tenants",
      views: 38,
      isPinned: false,
      status: "active"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      low: "bg-blue-100 text-blue-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-orange-100 text-orange-700",
      urgent: "bg-red-100 text-red-700"
    };
    return <Badge className={styles[priority]}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>;
  };

  const stats = [
    { label: "Active Notices", value: "5", icon: Megaphone, color: "text-primary" },
    { label: "Pinned Notices", value: "2", icon: Pin, color: "text-yellow-600" },
    { label: "Total Views", value: "157", icon: Eye, color: "text-blue-600" },
    { label: "Expiring Soon", value: "2", icon: Calendar, color: "text-orange-600" }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Active Notices
          </h1>
          <p className="text-muted-foreground">Currently active announcements and notifications</p>
        </div>
        <Button>
          <Megaphone className="h-4 w-4 mr-2" />
          Create New Notice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search notices..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Notice Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="rent">Rent Reminder</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="policy">Policy Update</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notices Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Active Notices ({activeNotices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead>Notice Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead className="text-center">Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeNotices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell>
                    {notice.isPinned && <Pin className="h-4 w-4 text-yellow-600 fill-yellow-600" />}
                  </TableCell>
                  <TableCell className="font-medium max-w-[250px] truncate">
                    {notice.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{notice.type}</Badge>
                  </TableCell>
                  <TableCell>{getPriorityBadge(notice.priority)}</TableCell>
                  <TableCell>{notice.publishedDate}</TableCell>
                  <TableCell>
                    {notice.expiryDate ? (
                      <span className="text-orange-600">{notice.expiryDate}</span>
                    ) : (
                      <span className="text-muted-foreground">No Expiry</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {notice.audience}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      {notice.views}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{notice.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant="outline">{notice.type}</Badge>
                              {getPriorityBadge(notice.priority)}
                              {notice.isPinned && <Badge className="bg-yellow-100 text-yellow-700">Pinned</Badge>}
                            </div>
                            <p className="text-muted-foreground">
                              This is the full notice content. Dear tenants, please be informed about the upcoming changes...
                            </p>
                            <div className="text-sm text-muted-foreground">
                              <p>Published: {notice.publishedDate}</p>
                              <p>Expiry: {notice.expiryDate || "No expiry"}</p>
                              <p>Views: {notice.views}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-yellow-600">
                        <PauseCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeNotices.filter(n => n.expiryDate).slice(0, 3).map((notice) => (
              <div key={notice.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{notice.title}</p>
                  <p className="text-xs text-muted-foreground">Expires: {notice.expiryDate}</p>
                </div>
                <Button size="sm" variant="outline">Extend</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Most Viewed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeNotices.sort((a, b) => b.views - a.views).slice(0, 3).map((notice, index) => (
              <div key={notice.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-sm">{notice.title}</p>
                    <p className="text-xs text-muted-foreground">{notice.type}</p>
                  </div>
                </div>
                <Badge variant="secondary">{notice.views} views</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
