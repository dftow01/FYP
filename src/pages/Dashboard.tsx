
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MalaysiaMap } from "@/components/MalaysiaMap";
import { StateInfoCard } from "@/components/StateInfoCard";
import { SummaryStats } from "@/components/SummaryStats";
import { TrendChart } from "@/components/TrendChart";

const Dashboard = () => {
  const [selectedState, setSelectedState] = useState<string>('Selangor');
  
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">COVID-19 Dashboard</h2>
          <p className="text-muted-foreground">
            7-day forecast and current statistics for Malaysia
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-2 h-[600px] md:h-[700px]">
          <CardHeader>
            <CardTitle>Malaysia COVID-19 Forecast Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-80px)]">
            <MalaysiaMap onSelectState={setSelectedState} />
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <StateInfoCard selectedState={selectedState} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                7-Day Trend Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart selectedState={selectedState} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
