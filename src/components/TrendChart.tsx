
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { usePredictionsByState } from "@/hooks/usePredictionData";

interface TrendChartProps {
  selectedState: string | null;
}

export const TrendChart = ({ selectedState }: TrendChartProps) => {
  // Use 'Selangor' as default if no state is selected
  const effectiveState = selectedState || 'Selangor';
  const { data: predictions, isLoading } = usePredictionsByState(effectiveState);

  // Process data for chart
  const chartData = predictions?.slice(-7).map((prediction, index) => ({
    day: `Day ${index + 1}`,
    cases: prediction.prediction !== undefined && prediction.prediction !== null ? Number(prediction.prediction.toFixed(2)) : 0.00,
    date: prediction.date
  })) || [];

  // Always use chartData (Selangor if no state selected)
  const dataToUse = chartData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-2 shadow-sm text-xs">
          <p className="font-medium">{label}</p>
          <p className="text-covid-blue font-semibold">
            Cases: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading && selectedState) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={cn("h-[200px]", !selectedState && "opacity-70")}>
      <div className="text-xs text-muted-foreground mb-1">Cases per 100k</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={dataToUse}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <XAxis 
            dataKey="day"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            width={30}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#1E88E5"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#1E88E5", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
