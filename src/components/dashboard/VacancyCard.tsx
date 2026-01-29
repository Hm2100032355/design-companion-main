import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BedDouble } from "lucide-react";

interface VacancyItem {
  type: string;
  available: number;
  status: "available" | "full";
}

interface VacancyCardProps {
  vacancies: VacancyItem[];
}

const VacancyCard = ({ vacancies }: VacancyCardProps) => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
          <BedDouble className="w-5 h-5 text-accent" />
          Vacancy Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {vacancies.map((vacancy, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  vacancy.status === "available" ? "bg-success" : "bg-muted-foreground"
                }`}
              />
              <span className="text-sm font-medium">{vacancy.type}</span>
            </div>
            {vacancy.status === "available" ? (
              <Badge variant="secondary" className="bg-success/10 text-success border-0">
                {vacancy.available} Beds Available
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
                Fully Occupied
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default VacancyCard;
