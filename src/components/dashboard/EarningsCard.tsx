import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, TrendingUp, Clock, Wallet } from "lucide-react";

interface EarningsCardProps {
  thisMonth: string;
  pending: string;
  advance: string;
  lastPayment: string;
}

const EarningsCard = ({
  thisMonth,
  pending,
  advance,
  lastPayment,
}: EarningsCardProps) => {
  return (
    <Card className="border-0 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-display font-semibold flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-accent" />
          Earnings & Payments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gradient-accent rounded-xl text-accent-foreground">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm opacity-90">This Month Collection</span>
          </div>
          <span className="text-2xl font-display font-bold">{thisMonth}</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-muted/50 rounded-xl text-center">
            <Clock className="w-4 h-4 mx-auto text-warning mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Pending</p>
            <p className="text-sm font-semibold">{pending}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-xl text-center">
            <Wallet className="w-4 h-4 mx-auto text-success mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Advance</p>
            <p className="text-sm font-semibold">{advance}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-xl text-center">
            <CreditCard className="w-4 h-4 mx-auto text-primary mb-1" />
            <p className="text-xs text-muted-foreground mb-1">Last Payment</p>
            <p className="text-sm font-semibold">{lastPayment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsCard;
