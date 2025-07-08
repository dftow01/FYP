
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface PredictionChartProps {
  data: Array<{ date: string; predicted: number; actual: number }>;
  isLoading?: boolean;
}

export const PredictionChart = ({ data, isLoading }: PredictionChartProps) => {
  const chartConfig = {
    predicted: {
      label: "Predicted (per 100k)",
      color: "#3b82f6",
    },
    actual: {
      label: "Actual (per 100k)",
      color: "#ef4444",
    },
  };

  if (isLoading) {
    return <div className="h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#666"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#666"
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke={chartConfig.predicted.color}
            strokeWidth={2}
            dot={{ fill: chartConfig.predicted.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name={chartConfig.predicted.label}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke={chartConfig.actual.color}
            strokeWidth={2}
            dot={{ fill: chartConfig.actual.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
            name={chartConfig.actual.label}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
