import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, AlertTriangle, CheckCircle } from "lucide-react";

const complaints = [
  {
    issue: "Water Issue",
    room: "Room 102",
    status: "open",
  },
  {
    issue: "Wi-Fi Issue",
    room: "Room 201",
    status: "open",
  },
];

interface ComplaintsCardProps {
  openCount: number;
  resolvedCount: number;
}

const ComplaintsCard = ({ openCount, resolvedCount }: ComplaintsCardProps) => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
          <Wrench className="w-5 h-5 text-accent" />
          Complaints & Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 p-4 bg-destructive/5 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Open</span>
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              {openCount}
            </span>
          </div>
          <div className="flex-1 p-4 bg-success/5 rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm text-muted-foreground">Resolved</span>
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              {resolvedCount}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Recent Open Issues
          </p>
          {complaints.map((complaint, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                <div>
                  <p className="text-sm font-medium">{complaint.issue}</p>
                  <p className="text-xs text-muted-foreground">
                    {complaint.room}
                  </p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-destructive/10 text-destructive border-0"
              >
                Open
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintsCard;
