
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Users, AlertTriangle, Activity, Heart } from "lucide-react";
import { usePredictionData } from "@/hooks/usePredictionData";

export const SummaryStats = () => {
  const { data: predictions, isLoading } = usePredictionData();

  // Custom Heartbeat component since it's not available in lucide-react
  const HeartbeatIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
      <path d="M3.5 12h6l.5-1 2 4 .5-1h6"></path>
    </svg>
  );

  // Calculate stats from real data
  const totalCases = predictions?.reduce((sum, pred) => sum + Math.round(pred.prediction || 0), 0) || 0;
  const highRiskStates = predictions?.filter(pred => Math.round(pred.prediction || 0) > 200).length || 0;
  
  // Mock calculated values that would come from additional data sources
  const icuOccupancy = 68;
  const recoveryRate = 93.1;

  const stats = [
    {
      title: "Total Predicted Cases",
      value: totalCases.toLocaleString(),
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "text-covid-blue",
      bgColor: "bg-covid-light",
      isLoading,
    },
    {
      title: "High-Risk States",
      value: highRiskStates.toString(),
      change: "+1",
      trend: "up",
      icon: AlertTriangle,
      color: "text-covid-amber",
      bgColor: "bg-yellow-50",
      isLoading,
    },
    {
      title: "ICU Occupancy",
      value: `${icuOccupancy}%`,
      change: "-3.2%",
      trend: "down",
      icon: Activity,
      color: "text-covid-teal",
      bgColor: "bg-green-50",
      isLoading: false,
    },
    {
      title: "Avg. Recovery Rate",
      value: `${recoveryRate}%`,
      change: "+1.5%",
      trend: "up",
      icon: HeartbeatIcon,
      color: "text-covid-red",
      bgColor: "bg-red-50",
      isLoading: false,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <div className="flex items-center gap-2">
                  {stat.isLoading ? (
                    <div className="h-8 w-20 bg-muted animate-pulse rounded"></div>
                  ) : (
                    <p className="text-2xl font-bold">{stat.value}</p>
                  )}
                  <div className={`flex items-center text-xs font-medium ${stat.trend === "up" ? "text-covid-red" : "text-covid-teal"}`}>
                    {stat.trend === "up" ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
              </div>
              <div className={`rounded-full p-2 ${stat.bgColor} ${stat.color}`}>
                {typeof stat.icon === "function" ? (
                  <stat.icon className="h-5 w-5" />
                ) : null}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 px-6 py-3">
            <p className="text-xs text-muted-foreground">
              Updated: {new Date().toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
