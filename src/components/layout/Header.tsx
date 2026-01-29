import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Building2,
  ChevronDown,
  Check,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, text: "New tenant booking request received", time: "2 min ago", unread: true },
    { id: 2, text: "Rent payment received from Rahul Kumar", time: "1 hour ago", unread: true },
    { id: 3, text: "PG listing approved by admin", time: "3 hours ago", unread: false },
    { id: 4, text: "Complaint resolved successfully", time: "Yesterday", unread: false },
  ]);

  const [properties] = useState([
    { id: 1, name: "Sunrise Men's PG", location: "Madhapur, Hyderabad", active: true },
    { id: 2, name: "Green Valley Hostel", location: "Gachibowli, Hyderabad", active: false },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="h-16 bg-card border-b border-border fixed top-0 right-0 left-64 z-30 flex items-center justify-between px-6">
      {/* Property Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <Building2 className="w-4 h-4 text-accent" />
            <span className="font-medium">Sunrise Men's PG</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-72">
          <DropdownMenuLabel>Switch Property</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {properties.map((property) => (
            <DropdownMenuItem key={property.id} className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium">{property.name}</p>
                <p className="text-xs text-muted-foreground">{property.location}</p>
              </div>
              {property.active && <Check className="w-4 h-4 text-success" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-accent">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start gap-1 cursor-pointer py-3"
                >
                  <div className="flex items-start gap-2 w-full">
                    {notification.unread && (
                      <div className="w-2 h-2 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    )}
                    <div className={notification.unread ? "" : "ml-4"}>
                      <p className="text-sm">{notification.text}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-accent cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                  RK
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">Rajesh Kumar</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <p className="font-medium">Rajesh Kumar</p>
                <p className="text-xs text-muted-foreground font-normal">rajesh@email.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
