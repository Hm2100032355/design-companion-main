import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { History, Search, Filter, Eye, RotateCcw, Download, Calendar, Clock, Users, CheckCircle, XCircle, Archive } from "lucide-react";

export default function NoticeHistory() {
  const noticeHistory = [
    {
      id: 1,
      title: "December Rent Reminder",
      type: "Rent Reminder",
      priority: "high",
      publishedDate: "2024-12-01",
      expiredDate: "2024-12-10",
      audience: "All Tenants",
      views: 45,
      status: "expired"
    },
    {
      id: 2,
      title: "Christmas Holiday Notice",
      type: "Event Notice",
      priority: "low",
      publishedDate: "2024-12-20",
      expiredDate: "2024-12-26",
      audience: "All Tenants",
      views: 52,
      status: "expired"
    },
    {
      id: 3,
      title: "Generator Maintenance Complete",
      type: "Maintenance Notice",
      priority: "medium",
      publishedDate: "2024-12-15",
      expiredDate: "2024-12-16",
      audience: "All Tenants",
      views: 38,
      status: "expired"
    },
    {
      id: 4,
      title: "Annual Deep Cleaning Schedule",
      type: "General Announcement",
      priority: "medium",
      publishedDate: "2024-12-10",
      expiredDate: null,
      audience: "All Tenants",
      views: 41,
      status: "archived"
    },
    {
      id: 5,
      title: "November Rent Due Reminder",
      type: "Rent Reminder",
      priority: "high",
      publishedDate: "2024-11-01",
      expiredDate: "2024-11-10",
      audience: "All Tenants",
      views: 48,
      status: "expired"
    },
    {
      id: 6,
      title: "Diwali Festival Celebrations",
      type: "Event Notice",
      priority: "low",
      publishedDate: "2024-11-01",
      expiredDate: "2024-11-05",
      audience: "All Tenants",
      views: 55,
      status: "expired"
    },
    {
      id: 7,
      title: "Water Tank Cleaning - Draft",
      type: "Maintenance Notice",
      priority: "medium",
      publishedDate: null,
      expiredDate: null,
      audience: "All Tenants",
      views: 0,
      status: "draft"
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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { color: string; icon: typeof CheckCircle }> = {
      expired: { color: "bg-gray-100 text-gray-700", icon: Clock },
      archived: { color: "bg-purple-100 text-purple-700", icon: Archive },
      draft: { color: "bg-blue-100 text-blue-700", icon: Clock }
    };
    const config = styles[status];
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const stats = [
    { label: "Total Notices", value: "127", icon: History, color: "text-primary" },
    { label: "Expired", value: "98", icon: Clock, color: "text-gray-600" },
    { label: "Archived", value: "24", icon: Archive, color: "text-purple-600" },
    { label: "Drafts", value: "5", icon: Clock, color: "text-blue-600" }
  ];

  const monthlyStats = [
    { month: "January 2025", notices: 5, views: 157 },
    { month: "December 2024", notices: 8, views: 234 },
    { month: "November 2024", notices: 6, views: 198 },
    { month: "October 2024", notices: 7, views: 211 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            Notice History
          </h1>
          <p className="text-muted-foreground">View past announcements and archived notices</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export History
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
                <Input placeholder="Search past notices..." className="pl-10" />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
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
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="jan-2025">January 2025</SelectItem>
                <SelectItem value="dec-2024">December 2024</SelectItem>
                <SelectItem value="nov-2024">November 2024</SelectItem>
                <SelectItem value="oct-2024">October 2024</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* History Table */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Notice History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notice Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Expired/Archived</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {noticeHistory.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {notice.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{notice.type}</Badge>
                      </TableCell>
                      <TableCell>
                        {notice.publishedDate || <span className="text-muted-foreground">Not published</span>}
                      </TableCell>
                      <TableCell>
                        {notice.expiredDate || <span className="text-muted-foreground">-</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          {notice.views}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(notice.status)}</TableCell>
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
                                  {getStatusBadge(notice.status)}
                                </div>
                                <p className="text-muted-foreground">
                                  This is the archived notice content. Dear tenants, please be informed...
                                </p>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Published</p>
                                    <p className="font-medium">{notice.publishedDate || "Not published"}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Expired</p>
                                    <p className="font-medium">{notice.expiredDate || "-"}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Audience</p>
                                    <p className="font-medium">{notice.audience}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Total Views</p>
                                    <p className="font-medium">{notice.views}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon" title="Reuse this notice">
                            <RotateCcw className="h-4 w-4" />
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

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {monthlyStats.map((stat) => (
                <div key={stat.month} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{stat.month}</p>
                    <p className="text-xs text-muted-foreground">{stat.notices} notices published</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{stat.views}</p>
                    <p className="text-xs text-muted-foreground">total views</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Notice Types Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rent Reminders</span>
                  <span className="font-medium">35%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "35%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Maintenance</span>
                  <span className="font-medium">25%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Events</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>General</span>
                  <span className="font-medium">20%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "20%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-primary/5">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <Archive className="h-8 w-8 mx-auto text-primary" />
                <p className="font-medium">Auto-Archive Enabled</p>
                <p className="text-sm text-muted-foreground">
                  Expired notices are automatically archived after 30 days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
