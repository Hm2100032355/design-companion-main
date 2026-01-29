import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  BedDouble,
  Camera,
  RefreshCw,
  Calendar,
  Zap,
} from "lucide-react";

const actions = [
  {
    icon: Building2,
    label: "Add / Edit PG Details",
    variant: "secondary" as const,
  },
  {
    icon: BedDouble,
    label: "Manage Rooms & Beds",
    variant: "secondary" as const,
  },
  {
    icon: Camera,
    label: "Upload Photos",
    variant: "secondary" as const,
  },
  {
    icon: RefreshCw,
    label: "Update Vacancies",
    variant: "secondary" as const,
  },
  {
    icon: Calendar,
    label: "View Booking Requests",
    variant: "accent" as const,
  },
];

const QuickActions = () => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="h-auto py-4 flex flex-col gap-2 items-center justify-center"
          >
            <action.icon className="w-5 h-5" />
            <span className="text-xs text-center leading-tight">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
