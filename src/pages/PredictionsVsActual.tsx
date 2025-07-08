
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePredictionsByState } from "@/hooks/usePredictionData";
import { PredictionChart } from "@/components/PredictionChart";

const MALAYSIAN_STATES = [
  "Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis", "Pulau Pinang", "Sabah", "Sarawak", "Selangor", "Terengganu", "W.P. Kuala Lumpur", "W.P. Labuan", "W.P. Putrajaya"
];

const PredictionsVsActual = () => {
  const [selectedState, setSelectedState] = useState<string>("Selangor");
  const { data: predictions, isLoading } = usePredictionsByState(selectedState);

  // Prepare chart data: [{ date, predicted, actual }]
  const chartData = useMemo(() => {
    if (!predictions) return [];
    return predictions.map((item) => ({
      date: item.date,
      predicted: item.prediction !== undefined && item.prediction !== null ? Number(item.prediction.toFixed(2)) : 0.00,
      actual: item.cases_new_per100k_7d_avg !== undefined && item.cases_new_per100k_7d_avg !== null ? Number(item.cases_new_per100k_7d_avg.toFixed(2)) : 0.00,
    }));
  }, [predictions]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Predictions vs Actual</h2>
          <p className="text-muted-foreground">
            Compare AI predictions with actual reported data (per 100k)
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {MALAYSIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predicted vs Actual Trend</CardTitle>
          <p className="text-sm text-muted-foreground">
            Daily predicted vs actual cases per 100k for {selectedState}
          </p>
        </CardHeader>
        <CardContent className="h-[400px]">
          <PredictionChart data={chartData} isLoading={isLoading} />
        </CardContent>
      </Card>

      {/* Table for daily predicted vs actual values */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Predicted vs Actual Table</CardTitle>
          <p className="text-sm text-muted-foreground">
            Day-by-day comparison for {selectedState} (last 7 days) with error metrics
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 font-semibold">Day</th>
                  <th className="px-4 py-2 font-semibold">Date</th>
                  <th className="px-4 py-2 font-semibold">Predicted</th>
                  <th className="px-4 py-2 font-semibold">Actual</th>
                  <th className="px-4 py-2 font-semibold">Abs. Error</th>
                  <th className="px-4 py-2 font-semibold">Squared Error</th>
                  <th className="px-4 py-2 font-semibold">APE (%)</th>
                </tr>
              </thead>
              <tbody>
                {chartData.slice(-7).map((row, idx) => {
                  const absError = Math.abs(row.predicted - row.actual);
                  const sqError = Math.pow(row.predicted - row.actual, 2);
                  const ape = row.actual !== 0 ? Math.abs((row.predicted - row.actual) / row.actual) * 100 : 0;
                  return (
                    <tr key={row.date || idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2">Day {idx + 1}</td>
                      <td className="px-4 py-2">{row.date}</td>
                      <td className="px-4 py-2">{row.predicted.toFixed(2)}</td>
                      <td className="px-4 py-2">{row.actual.toFixed(2)}</td>
                      <td className="px-4 py-2">{absError.toFixed(2)}</td>
                      <td className="px-4 py-2">{sqError.toFixed(2)}</td>
                      <td className="px-4 py-2">{ape.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
              {/* Summary row for MAE, RMSE, MAPE */}
              <tfoot>
                {(() => {
                  const rows = chartData.slice(-7);
                  const n = rows.length;
                  if (n === 0) return null;
                  const mae = rows.reduce((sum, r) => sum + Math.abs(r.predicted - r.actual), 0) / n;
                  const rmse = Math.sqrt(rows.reduce((sum, r) => sum + Math.pow(r.predicted - r.actual, 2), 0) / n);
                  // SMAPE calculation
                  const smape = rows.reduce((sum, r) => {
                    const denom = (Math.abs(r.predicted) + Math.abs(r.actual));
                    if (denom === 0) return sum;
                    return sum + (Math.abs(r.predicted - r.actual) / denom);
                  }, 0) / n * 100;
                  return (
                    <tr className="bg-blue-50 font-semibold">
                      <td className="px-4 py-2" colSpan={4}>Summary (last 7 days)</td>
                      <td className="px-4 py-2">MAE: {mae.toFixed(2)}</td>
                      <td className="px-4 py-2">RMSE: {rmse.toFixed(2)}</td>
                      <td className="px-4 py-2">SMAPE: {smape.toFixed(2)}%</td>
                    </tr>
                  );
                })()}
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionsVsActual;
