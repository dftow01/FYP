
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { usePredictionsByState } from "@/hooks/usePredictionData";

interface StateInfoCardProps {
  selectedState: string | null;
}

export const StateInfoCard = ({ selectedState }: StateInfoCardProps) => {
  const { data: predictions, isLoading, error } = usePredictionsByState(selectedState);

  if (!selectedState) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">State Information</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            Select a state on the map to view detailed information
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{selectedState}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !predictions || predictions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{selectedState}</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">
            No prediction data available for this state
          </p>
        </CardContent>
      </Card>
    );
  }

  // Get the latest prediction
  const latestPrediction = predictions[predictions.length - 1];
  const currentCasesNum = latestPrediction?.prediction ?? 0;
  const currentCases = currentCasesNum.toFixed(2);
  
  // Calculate trend (mock calculation for now)
  const prevCasesNum = predictions.length > 1 ? predictions[predictions.length - 2]?.prediction ?? 0 : 0;
  const change = predictions.length > 1 
    ? ((currentCasesNum - prevCasesNum) / (prevCasesNum || 1)) * 100
    : 0;
  
  const trend = change >= 0 ? "up" : "down";
  
  // Mock additional data that would come from other sources
  const r0 = currentCasesNum > 300 ? 1.6 : currentCasesNum > 200 ? 1.3 : currentCasesNum > 100 ? 1.0 : 0.8;
  const icuCases = (currentCasesNum * 0.15).toFixed(2);
  const deaths = (currentCasesNum * 0.02).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{selectedState}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Predicted Cases (7 days) <span className="font-normal">per 100k</span></div>
          <div className="text-3xl font-bold">{currentCases}</div>
          <div className="flex items-center gap-1 text-sm">
            {trend === "up" ? (
              <>
                <ArrowUp className="h-4 w-4 text-covid-red" />
                <span className="text-covid-red">+{Math.abs(change).toFixed(1)}%</span>
              </>
            ) : (
              <>
                <ArrowDown className="h-4 w-4 text-covid-teal" />
                <span className="text-covid-teal">{change.toFixed(1)}%</span>
              </>
            )}
            <span className="text-muted-foreground">from previous period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
