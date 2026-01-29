import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const notifications = [
  {
    icon: Calendar,
    text: "New tenant booking request received",
    time: "2 min ago",
    type: "info",
  },
  {
    icon: CreditCard,
    text: "Rent payment received from Rahul Kumar",
    time: "1 hour ago",
    type: "success",
  },
  {
    icon: CheckCircle,
    text: "PG listing approved by admin",
    time: "3 hours ago",
    type: "success",
  },
  {
    icon: AlertCircle,
    text: "Complaint resolved successfully",
    time: "Yesterday",
    type: "info",
  },
];

const NotificationsPanel = () => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-accent" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                notification.type === "success"
                  ? "bg-success/10 text-success"
                  : "bg-accent/10 text-accent"
              }`}
            >
              <notification.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{notification.text}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {notification.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;
