import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  Home,
  BedDouble,
  Users,
  Calendar,
  CreditCard,
  Wrench,
  Megaphone,
  BarChart3,
  Star,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  DoorOpen,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <Home className="w-5 h-5" />,
    label: "My PG / Hostel",
    children: [
      { label: "Basic PG Information", href: "/dashboard/pg/basic" },
      { label: "Location Details", href: "/dashboard/pg/location" },
      { label: "Property Structure", href: "/dashboard/pg/structure" },
      { label: "Room & Bed Configuration", href: "/dashboard/pg/rooms" },
      { label: "Amenities & Facilities", href: "/dashboard/pg/amenities" },
      { label: "Food Facilities", href: "/dashboard/pg/food" },
      { label: "Photos & Media", href: "/dashboard/pg/photos" },
      { label: "Vacancy & Availability", href: "/dashboard/pg/vacancy" },
      { label: "Rules & Policies", href: "/dashboard/pg/rules" },
      { label: "Owner & Contact Details", href: "/dashboard/pg/contact" },
      { label: "Verification & Compliance", href: "/dashboard/pg/verification" },
    ],
  },
  {
    icon: <BedDouble className="w-5 h-5" />,
    label: "Rooms & Beds",
    children: [
      { label: "Room List", href: "/dashboard/rooms/list" },
      { label: "Add / Edit Room", href: "/dashboard/rooms/add" },
      { label: "Bed Configuration", href: "/dashboard/rooms/beds" },
      { label: "Room-wise Occupancy", href: "/dashboard/rooms/occupancy" },
      { label: "Maintenance Status", href: "/dashboard/rooms/maintenance" },
    ],
  },
  {
    icon: <DoorOpen className="w-5 h-5" />,
    label: "Vacancies",
    children: [
      { label: "Current Vacancies", href: "/dashboard/vacancies/current" },
      { label: "Update Vacancies", href: "/dashboard/vacancies/update" },
      { label: "Sharing Type Management", href: "/dashboard/vacancies/sharing" },
      { label: "Vacancy History", href: "/dashboard/vacancies/history" },
    ],
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Tenants",
    children: [
      { label: "Tenant List", href: "/dashboard/tenants/list" },
      { label: "Add Tenant", href: "/dashboard/tenants/add" },
      { label: "Tenant Profiles", href: "/dashboard/tenants/profiles" },
      { label: "Active Tenants", href: "/dashboard/tenants/active" },
      { label: "Vacated Tenants", href: "/dashboard/tenants/vacated" },
      { label: "Tenant Documents", href: "/dashboard/tenants/documents" },
    ],
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Bookings & Requests",
    children: [
      { label: "New Booking Requests", href: "/dashboard/bookings/new" },
      { label: "Visit Requests", href: "/dashboard/bookings/visits" },
      { label: "Approved Bookings", href: "/dashboard/bookings/approved" },
      { label: "Rejected Requests", href: "/dashboard/bookings/rejected" },
    ],
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: "Payments & Finance",
    children: [
      { label: "Rent Collection", href: "/dashboard/payments/rent" },
      { label: "Pending Payments", href: "/dashboard/payments/pending" },
      { label: "Advance Payments", href: "/dashboard/payments/advance" },
      { label: "Payment History", href: "/dashboard/payments/history" },
      { label: "Download Receipts", href: "/dashboard/payments/receipts" },
    ],
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    label: "Complaints & Maintenance",
    children: [
      { label: "Open Complaints", href: "/dashboard/complaints/open" },
      { label: "In-Progress", href: "/dashboard/complaints/progress" },
      { label: "Resolved Complaints", href: "/dashboard/complaints/resolved" },
      { label: "Assign Maintenance", href: "/dashboard/complaints/assign" },
      { label: "Maintenance History", href: "/dashboard/complaints/history" },
    ],
  },
  {
    icon: <Megaphone className="w-5 h-5" />,
    label: "Notices & Announcements",
    children: [
      { label: "Create Notice", href: "/dashboard/notices/create" },
      { label: "Active Notices", href: "/dashboard/notices/active" },
      { label: "Notice History", href: "/dashboard/notices/history" },
    ],
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    label: "Reports",
    children: [
      { label: "Occupancy Report", href: "/dashboard/reports/occupancy" },
      { label: "Rent Collection Report", href: "/dashboard/reports/rent" },
      { label: "Tenant Report", href: "/dashboard/reports/tenants" },
      { label: "Complaint Report", href: "/dashboard/reports/complaints" },
      { label: "Monthly Summary", href: "/dashboard/reports/monthly" },
    ],
  },
  {
    icon: <Star className="w-5 h-5" />,
    label: "Reviews & Ratings",
    children: [
      { label: "PG Ratings", href: "/dashboard/reviews/ratings" },
      { label: "Tenant Reviews", href: "/dashboard/reviews/tenant" },
      { label: "Reply to Reviews", href: "/dashboard/reviews/reply" },
    ],
  },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    children: [
      { label: "Profile Settings", href: "/dashboard/settings/profile" },
      { label: "PG Settings", href: "/dashboard/settings/pg" },
      { label: "Rent Settings", href: "/dashboard/settings/rent" },
      { label: "Notification Preferences", href: "/dashboard/settings/notifications" },
      { label: "Security Settings", href: "/dashboard/settings/security" },
    ],
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: "Support",
    children: [
      { label: "Contact Support", href: "/dashboard/support/contact" },
      { label: "Help / FAQ", href: "/dashboard/support/faq" },
      { label: "Raise Support Ticket", href: "/dashboard/support/ticket" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href?: string) => href && location.pathname === href;
  const isChildActive = (children?: { href: string }[]) =>
    children?.some((child) => location.pathname === child.href);

  return (
    <aside className="w-64 bg-sidebar h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border">
        <div className="w-9 h-9 bg-sidebar-primary rounded-lg flex items-center justify-center">
          <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <span className="text-sm font-display font-bold text-sidebar-foreground">
            Hostel / PG
          </span>
          <p className="text-xs text-sidebar-foreground/60">Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                      isChildActive(item.children)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </div>
                    {expandedItems.includes(item.label) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.label) && item.children && (
                    <ul className="mt-1 ml-4 pl-4 border-l border-sidebar-border space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-sm transition-colors",
                              isActive(child.href)
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50 text-center">
          © 2025 Hostel / PG System
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
