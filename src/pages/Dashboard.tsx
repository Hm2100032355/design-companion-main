import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/dashboard/StatCard";
import VacancyCard from "@/components/dashboard/VacancyCard";
import QuickActions from "@/components/dashboard/QuickActions";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";
import ComplaintsCard from "@/components/dashboard/ComplaintsCard";
import EarningsCard from "@/components/dashboard/EarningsCard";
import {
  Building2,
  BedDouble,
  Users,
  Calendar,
  MapPin,
  CheckCircle,
} from "lucide-react";

const Dashboard = () => {
  const vacancies = [
    { type: "2-Sharing", available: 3, status: "available" as const },
    { type: "3-Sharing", available: 5, status: "available" as const },
    { type: "4-Sharing", available: 0, status: "full" as const },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Welcome, Rajesh Kumar!
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your PG / hostel easily from one place.
          </p>
        </div>
        <Badge className="self-start md:self-center bg-success/10 text-success border-0 px-4 py-2 text-sm">
          <CheckCircle className="w-4 h-4 mr-2" />
          All Systems Active
        </Badge>
      </div>

      {/* Property Overview */}
      <Card className="border-0 shadow-card overflow-hidden">
        <div className="bg-gradient-primary p-6 text-primary-foreground">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-2xl flex items-center justify-center">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold">
                  Sunrise Men's PG
                </h2>
                <div className="flex items-center gap-2 mt-1 text-primary-foreground/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Madhapur, Hyderabad</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 backdrop-blur">
                Boys PG
              </Badge>
              <Badge className="bg-success/20 text-success border-0 backdrop-blur">
                Active
              </Badge>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Occupancy Rate
                </span>
                <span className="text-lg font-display font-bold text-accent">
                  75%
                </span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>2 Pending Requests</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Rooms"
          value={12}
          icon={Building2}
          variant="default"
        />
        <StatCard
          title="Total Beds"
          value={48}
          icon={BedDouble}
          variant="accent"
        />
        <StatCard
          title="Occupied Beds"
          value={36}
          subtitle="75% occupancy"
          icon={Users}
          variant="success"
        />
        <StatCard
          title="Vacant Beds"
          value={12}
          subtitle="Available now"
          icon={BedDouble}
          variant="warning"
        />
      </div>

      {/* Tenant Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Tenants"
          value={36}
          icon={Users}
          variant="default"
        />
        <StatCard
          title="Active Tenants"
          value={34}
          trend={{ value: "2", positive: true }}
          icon={Users}
          variant="success"
        />
        <StatCard
          title="Vacated This Month"
          value={2}
          icon={Users}
          variant="accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VacancyCard vacancies={vacancies} />
            <QuickActions />
          </div>
          <EarningsCard
            thisMonth="₹1,80,000"
            pending="₹8,000"
            advance="₹15,000"
            lastPayment="₹8,000"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <NotificationsPanel />
          <ComplaintsCard openCount={2} resolvedCount={8} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-border mt-8">
        <p className="text-sm text-muted-foreground">
          © 2025 Hostel / PG Management System · Secure · Reliable · Cloud-Based
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
