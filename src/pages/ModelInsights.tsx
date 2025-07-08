import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, TrendingUp, Activity, Users, MapPin, Award, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const ModelInsights = () => {
  // Mock TFT variable importance data
  const variableImportance = [
    { variable: 'daily_full_per100k_7d_avg', importance: 7.8354, category: 'vaccination', description: 'Daily full vaccinations per 100k (7-day avg)' },
    { variable: 'population', importance: 4.0918, category: 'demographic', description: 'Population of the state' },
    { variable: 'vaccination_coverage_booster', importance: 2.8317, category: 'vaccination', description: 'Booster vaccination coverage' },
    { variable: 'Stringency index (weighted average)', importance: 2.5968, category: 'policy', description: 'Government stringency index (weighted avg)' },
    { variable: 'time_idx', importance: 2.4622, category: 'time', description: 'Time index (sequential)' },
    { variable: 'is_holiday', importance: 1.7291, category: 'policy', description: 'Is holiday (binary)' },
    { variable: 'Reproduction rate', importance: 1.3956, category: 'epidemiology', description: 'Estimated reproduction rate (Rt)' },
    { variable: 'month', importance: 1.3511, category: 'time', description: 'Month' },
    { variable: 'state', importance: 1.3411, category: 'demographic', description: 'State name' },
    { variable: 'cases_new_lag_3_7d_avg', importance: 1.0687, category: 'epidemiology', description: 'New cases (lag 3, 7-day avg)' },
    { variable: 'is_weekend', importance: 1.1070, category: 'time', description: 'Is weekend (binary)' },
    { variable: 'holiday_type', importance: 0.6075, category: 'policy', description: 'Type of holiday' },
    { variable: 'grocery_and_pharmacy_percent_change_from_baseline_7d_avg', importance: 0.5520, category: 'mobility', description: 'Grocery & pharmacy mobility (7-day avg)' },
    { variable: 'cases_new_lag_7_7d_avg', importance: 0.5154, category: 'epidemiology', description: 'New cases (lag 7, 7-day avg)' },
    { variable: 'transit_stations_percent_change_from_baseline_7d_avg', importance: 0.4317, category: 'mobility', description: 'Transit stations mobility (7-day avg)' },
    { variable: 'cases_new_lag_14_7d_avg', importance: 0.4072, category: 'epidemiology', description: 'New cases (lag 14, 7-day avg)' },
    { variable: 'deaths_new_per100k_7d_avg', importance: 0.3919, category: 'epidemiology', description: 'New deaths per 100k (7-day avg)' },
    { variable: 'vaccination_coverage_full', importance: 0.3472, category: 'vaccination', description: 'Full vaccination coverage' },
    { variable: 'time_idx', importance: 0.3068, category: 'time', description: 'Time index (sequential)' },
    { variable: 'cases_recovered_per100k_7d_avg', importance: 0.2922, category: 'epidemiology', description: 'Recovered cases per 100k (7-day avg)' },
    { variable: 'month', importance: 0.2785, category: 'time', description: 'Month' },
    { variable: 'cases_new_lag_1_7d_avg', importance: 0.2607, category: 'epidemiology', description: 'New cases (lag 1, 7-day avg)' },
    { variable: 'is_weekend', importance: 0.2376, category: 'time', description: 'Is weekend (binary)' },
    { variable: 'hosp_covid_per100k_7d_avg', importance: 0.1718, category: 'healthcare', description: 'COVID-19 hospitalizations per 100k (7-day avg)' },
    { variable: 'daily_booster_per100k_lag14_7d_avg', importance: 0.1566, category: 'vaccination', description: 'Daily booster vaccinations per 100k (lag 14, 7-day avg)' },
    { variable: 'Reproduction rate', importance: 0.1451, category: 'epidemiology', description: 'Estimated reproduction rate (Rt)' },
    { variable: 'is_holiday', importance: 0.1432, category: 'policy', description: 'Is holiday (binary)' },
    { variable: 'retail_and_recreation_percent_change_from_baseline_7d_avg', importance: 0.1367, category: 'mobility', description: 'Retail & recreation mobility (7-day avg)' },
    { variable: 'holiday_type', importance: 0.1323, category: 'policy', description: 'Type of holiday' },
    { variable: 'day_of_week', importance: 0.1271, category: 'time', description: 'Day of week' },
    { variable: 'workplaces_percent_change_from_baseline_7d_avg', importance: 0.1219, category: 'mobility', description: 'Workplaces mobility (7-day avg)' },
    { variable: 'residential_percent_change_from_baseline_7d_avg', importance: 0.1004, category: 'mobility', description: 'Residential mobility (7-day avg)' },
    { variable: 'daily_full_per100k_lag14_7d_avg', importance: 0.0980, category: 'vaccination', description: 'Daily full vaccinations per 100k (lag 14, 7-day avg)' },
    { variable: 'hospital_utilization_rate_7d_avg', importance: 0.0928, category: 'healthcare', description: 'Hospital utilization rate (7-day avg)' },
    { variable: 'daily_booster_per100k_7d_avg', importance: 0.0923, category: 'vaccination', description: 'Daily booster vaccinations per 100k (7-day avg)' },
    { variable: 'admitted_covid_per100k_7d_avg', importance: 0.0853, category: 'healthcare', description: 'Admitted COVID-19 per 100k (7-day avg)' },
    { variable: 'vaccination_coverage_booster', importance: 0.0844, category: 'vaccination', description: 'Booster vaccination coverage' },
    { variable: 'Stringency index (weighted average)', importance: 0.0789, category: 'policy', description: 'Government stringency index (weighted avg)' },
    { variable: 'cases_new_per100k_7d_avg', importance: 0.0449, category: 'epidemiology', description: 'New cases per 100k (7-day avg)' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "epidemiology":
        return "#ef4444";
      case "demographic":
        return "#f59e0b";
      case "behavioral":
        return "#10b981";
      case "healthcare":
        return "#3b82f6";
      case "intervention":
        return "#8b5cf6";
      case "environmental":
        return "#06b6d4";
      default:
        return "#6b7280";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "epidemiology":
        return <TrendingUp className="h-4 w-4" />;
      case "demographic":
        return <Users className="h-4 w-4" />;
      case "behavioral":
        return <Activity className="h-4 w-4" />;
      case "healthcare":
        return <Activity className="h-4 w-4" />;
      case "intervention":
        return <MapPin className="h-4 w-4" />;
      case "environmental":
        return <Activity className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "epidemiology":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "demographic":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "behavioral":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "healthcare":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "intervention":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "environmental":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const chartConfig = {
    importance: {
      label: "Variable Importance",
      color: "#3b82f6",
    },
  };

  // Group variables by category for summary
  const categoryGroups = variableImportance.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof variableImportance>);

  // --- Performance metrics data from user ---
  const performanceMetrics = [
    { state: 'Johor', MAE: 1.713075, MSE: 3.143384, RMSE: 1.772959, SMAPE: 41.369586 },
    { state: 'Kedah', MAE: 2.337725, MSE: 5.510191, RMSE: 2.347380, SMAPE: 82.910910 },
    { state: 'Kelantan', MAE: 0.342431, MSE: 0.267172, RMSE: 0.516887, SMAPE: 7.518260 },
    { state: 'Melaka', MAE: 2.568588, MSE: 6.958063, RMSE: 2.637814, SMAPE: 19.863158 },
    { state: 'Negeri Sembilan', MAE: 1.914949, MSE: 4.455683, RMSE: 2.110849, SMAPE: 17.141881 },
    { state: 'Pahang', MAE: 0.618791, MSE: 0.452680, RMSE: 0.672815, SMAPE: 25.911886 },
    { state: 'Perak', MAE: 1.428082, MSE: 2.180689, RMSE: 1.476716, SMAPE: 16.194418 },
    { state: 'Perlis', MAE: 1.108285, MSE: 1.331706, RMSE: 1.153996, SMAPE: 81.922253 },
    { state: 'Pulau Pinang', MAE: 2.248403, MSE: 5.562671, RMSE: 2.358531, SMAPE: 37.778826 },
    { state: 'Sabah', MAE: 3.002925, MSE: 9.025416, RMSE: 3.004233, SMAPE: 91.717428 },
    { state: 'Sarawak', MAE: 1.837229, MSE: 3.400638, RMSE: 1.844082, SMAPE: 82.482402 },
    { state: 'Selangor', MAE: 0.552346, MSE: 0.405542, RMSE: 0.636822, SMAPE: 3.132116 },
    { state: 'Terengganu', MAE: 0.359093, MSE: 0.174890, RMSE: 0.418199, SMAPE: 16.588883 },
    { state: 'W.P. Kuala Lumpur', MAE: 2.985864, MSE: 9.836866, RMSE: 3.136378, SMAPE: 8.334178 },
    { state: 'W.P. Labuan', MAE: 1.508695, MSE: 2.362617, RMSE: 1.537081, SMAPE: 99.999884 },
  ];

  const getPerformanceBadge = (mape: number) => {
    if (mape <= 5) return "bg-green-100 text-green-800 hover:bg-green-100";
    if (mape <= 10) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    return "bg-red-100 text-red-800 hover:bg-red-100";
  };

  const getPerformanceLabel = (mape: number) => {
    if (mape <= 5) return "Excellent";
    if (mape <= 10) return "Good";
    return "Needs Improvement";
  };

  // Sort for top and bottom 5 by SMAPE
  const sortedBySmape = [...performanceMetrics].sort((a, b) => a.SMAPE - b.SMAPE);
  const top5 = sortedBySmape.slice(0, 5);
  const bottom5 = sortedBySmape.slice(-5).reverse();

  // --- Variable importance data from user, with categories ---
  const staticVariables = [
    { variable: 'population', importance: 4.0918 },
    { variable: 'state', importance: 1.3411 },
  ];
  const encoderVariables = [
    { variable: 'daily_full_per100k_7d_avg', importance: 7.8354 },
    { variable: 'cases_new_lag_3_7d_avg', importance: 1.0687 },
    { variable: 'grocery_and_pharmacy_percent_change_from_baseline_7d_avg', importance: 0.5520 },
    { variable: 'cases_new_lag_7_7d_avg', importance: 0.5154 },
    { variable: 'transit_stations_percent_change_from_baseline_7d_avg', importance: 0.4317 },
    { variable: 'cases_new_lag_14_7d_avg', importance: 0.4072 },
    { variable: 'deaths_new_per100k_7d_avg', importance: 0.3919 },
    { variable: 'vaccination_coverage_full', importance: 0.3472 },
    { variable: 'time_idx', importance: 0.3068 },
    { variable: 'cases_recovered_per100k_7d_avg', importance: 0.2922 },
    { variable: 'month', importance: 0.2785 },
    { variable: 'cases_new_lag_1_7d_avg', importance: 0.2607 },
    { variable: 'is_weekend', importance: 0.2376 },
    { variable: 'hosp_covid_per100k_7d_avg', importance: 0.1718 },
    { variable: 'daily_booster_per100k_lag14_7d_avg', importance: 0.1566 },
    { variable: 'Reproduction rate', importance: 0.1451 },
    { variable: 'is_holiday', importance: 0.1432 },
    { variable: 'retail_and_recreation_percent_change_from_baseline_7d_avg', importance: 0.1367 },
    { variable: 'holiday_type', importance: 0.1323 },
    { variable: 'day_of_week', importance: 0.1271 },
    { variable: 'workplaces_percent_change_from_baseline_7d_avg', importance: 0.1219 },
    { variable: 'residential_percent_change_from_baseline_7d_avg', importance: 0.1004 },
    { variable: 'daily_full_per100k_lag14_7d_avg', importance: 0.0980 },
    { variable: 'hospital_utilization_rate_7d_avg', importance: 0.0928 },
    { variable: 'daily_booster_per100k_7d_avg', importance: 0.0923 },
    { variable: 'admitted_covid_per100k_7d_avg', importance: 0.0853 },
    { variable: 'vaccination_coverage_booster', importance: 0.0844 },
    { variable: 'Stringency index (weighted average)', importance: 0.0789 },
    { variable: 'cases_new_per100k_7d_avg', importance: 0.0449 },
  ];
  const decoderVariables = [
    { variable: 'vaccination_coverage_booster', importance: 2.8317 },
    { variable: 'Stringency index (weighted average)', importance: 2.5968 },
    { variable: 'time_idx', importance: 2.4622 },
    { variable: 'is_holiday', importance: 1.7291 },
    { variable: 'Reproduction rate', importance: 1.3956 },
    { variable: 'month', importance: 1.3511 },
    { variable: 'is_weekend', importance: 1.1070 },
    { variable: 'holiday_type', importance: 0.6075 },
    { variable: 'day_of_week', importance: 0.2862 },
    { variable: 'vaccination_coverage_full', importance: 0.1317 },
  ];

  // Combine all variable importance into one array for visualization
  const allVariableImportance = [
    // Static
    ...staticVariables.map(v => ({ ...v, category: 'static' })),
    // Encoder
    ...encoderVariables.map(v => ({ ...v, category: 'encoder' })),
    // Decoder
    ...decoderVariables.map(v => ({ ...v, category: 'decoder' })),
  ];

  // For visualization, show top 15 by importance
  const topVariableImportance = allVariableImportance.sort((a, b) => b.importance - a.importance).slice(0, 15);

  const variableCategoryColors = {
    static: '#6366f1',
    encoder: '#10b981',
    decoder: '#f59e0b',
  };

  // Sort variableImportance by importance descending for display
  const sortedVariableImportance = [...variableImportance].sort((a, b) => b.importance - a.importance);

  // Category total importance scores from user
  const categoryTotals = [
    { category: 'Vaccination', score: 11.5773 },
    { category: 'Time-based', score: 6.1565 },
    { category: 'Demographics', score: 5.4329 },
    { category: 'Policy', score: 5.2878 },
    { category: 'Epidemiology', score: 4.5217 },
    { category: 'Mobility', score: 1.3427 },
    { category: 'Hospitalization', score: 0.3499 },
  ];

  const categoryExplanations = {
    Vaccination: 'Most important predictor, indicating the transition into the endemic phase where population immunity plays a key role.',
    'Time-based': 'Captures seasonal trends, behavioral cycles, and periodic patterns critical to infectious disease forecasting.',
    Demographics: 'Reflects population size and geographic identity, which heavily influence outbreak dynamics and response.',
    Policy: 'Includes stringency measures and holidays, which shape behavior and restrict transmission.',
    Epidemiology: 'Includes past case and death trends — foundational to any outbreak prediction.',
    Mobility: 'Less influential but still relevant for movement-based transmission modeling.',
    Hospitalization: 'Indicates lower importance in the TFT model because the prediction is for the endemic phase, where COVID-19 hospitalization cases are decreasing.',
  };

  // Build a unique variable list with all types (static, encoder, decoder) for each variable
  const staticVars = [
    { variable: 'population', importance: 4.0918 },
    { variable: 'state', importance: 1.3411 },
  ];
  const encoderVars = [
    { variable: 'daily_full_per100k_7d_avg', importance: 7.8354 },
    { variable: 'cases_new_lag_3_7d_avg', importance: 1.0687 },
    { variable: 'grocery_and_pharmacy_percent_change_from_baseline_7d_avg', importance: 0.5520 },
    { variable: 'cases_new_lag_7_7d_avg', importance: 0.5154 },
    { variable: 'transit_stations_percent_change_from_baseline_7d_avg', importance: 0.4317 },
    { variable: 'cases_new_lag_14_7d_avg', importance: 0.4072 },
    { variable: 'deaths_new_per100k_7d_avg', importance: 0.3919 },
    { variable: 'vaccination_coverage_full', importance: 0.3472 },
    { variable: 'time_idx', importance: 0.3068 },
    { variable: 'cases_recovered_per100k_7d_avg', importance: 0.2922 },
    { variable: 'month', importance: 0.2785 },
    { variable: 'cases_new_lag_1_7d_avg', importance: 0.2607 },
    { variable: 'is_weekend', importance: 0.2376 },
    { variable: 'hosp_covid_per100k_7d_avg', importance: 0.1718 },
    { variable: 'daily_booster_per100k_lag14_7d_avg', importance: 0.1566 },
    { variable: 'Reproduction rate', importance: 0.1451 },
    { variable: 'is_holiday', importance: 0.1432 },
    { variable: 'retail_and_recreation_percent_change_from_baseline_7d_avg', importance: 0.1367 },
    { variable: 'holiday_type', importance: 0.1323 },
    { variable: 'day_of_week', importance: 0.1271 },
    { variable: 'workplaces_percent_change_from_baseline_7d_avg', importance: 0.1219 },
    { variable: 'residential_percent_change_from_baseline_7d_avg', importance: 0.1004 },
    { variable: 'daily_full_per100k_lag14_7d_avg', importance: 0.0980 },
    { variable: 'hospital_utilization_rate_7d_avg', importance: 0.0928 },
    { variable: 'daily_booster_per100k_7d_avg', importance: 0.0923 },
    { variable: 'admitted_covid_per100k_7d_avg', importance: 0.0853 },
    { variable: 'vaccination_coverage_booster', importance: 0.0844 },
    { variable: 'Stringency index (weighted average)', importance: 0.0789 },
    { variable: 'cases_new_per100k_7d_avg', importance: 0.0449 },
  ];
  const decoderVars = [
    { variable: 'vaccination_coverage_booster', importance: 2.8317 },
    { variable: 'Stringency index (weighted average)', importance: 2.5968 },
    { variable: 'time_idx', importance: 2.4622 },
    { variable: 'is_holiday', importance: 1.7291 },
    { variable: 'Reproduction rate', importance: 1.3956 },
    { variable: 'month', importance: 1.3511 },
    { variable: 'is_weekend', importance: 1.1070 },
    { variable: 'holiday_type', importance: 0.6075 },
    { variable: 'day_of_week', importance: 0.2862 },
    { variable: 'vaccination_coverage_full', importance: 0.1317 },
  ];

  // Merge all variables, collecting all types and the highest importance for each
  const variableMap = new Map();
  [...staticVars.map(v => ({ ...v, type: 'static' })),
   ...encoderVars.map(v => ({ ...v, type: 'encoder' })),
   ...decoderVars.map(v => ({ ...v, type: 'decoder' }))
  ].forEach(({ variable, importance, type }) => {
    if (!variableMap.has(variable)) {
      variableMap.set(variable, { variable, importance, types: [type] });
    } else {
      const entry = variableMap.get(variable);
      entry.types.push(type);
      // Use the highest importance value for display
      entry.importance = Math.max(entry.importance, importance);
    }
  });
  const mergedVariableImportance = Array.from(variableMap.values());

  // Sort mergedVariableImportance in descending order by importance
  const sortedMergedVariableImportance = mergedVariableImportance.sort((a, b) => b.importance - a.importance);

  // Assign a unique color for each category
  const categoryColorPalette = {
    Vaccination: '#6366f1', // Indigo
    'Time-based': '#06b6d4', // Cyan
    Demographics: '#f59e42', // Orange
    Policy: '#8b5cf6', // Purple
    Epidemiology: '#ef4444', // Red
    Mobility: '#10b981', // Green
    Hospitalization: '#3b82f6', // Blue
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">TFT Model Insights</h2>
          <p className="text-muted-foreground">
            Variable importance analysis from the Temporal Fusion Transformer model
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Model Information:</strong> This analysis shows the relative importance of different variables 
          in the Temporal Fusion Transformer (TFT) model used for COVID-19 predictions. Variable importance 
          scores are derived from attention weights and feature contribution analysis.
        </AlertDescription>
      </Alert>

      {/* Model Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-700">Top Performers</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              States with the best model prediction accuracy
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>SMAPE (%)</TableHead>
                  <TableHead>MAE</TableHead>
                  <TableHead>MSE</TableHead>
                  <TableHead>RMSE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {top5.map((performer, index) => (
                  <TableRow key={performer.state}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                          {index + 1}
                        </div>
                        {performer.state}
                      </div>
                    </TableCell>
                    <TableCell>{performer.SMAPE.toFixed(2)}</TableCell>
                    <TableCell>{performer.MAE.toFixed(3)}</TableCell>
                    <TableCell>{performer.MSE.toFixed(3)}</TableCell>
                    <TableCell>{performer.RMSE.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Worst Performers */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-700">Areas for Improvement</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              States requiring model optimization and data quality improvements
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>State</TableHead>
                  <TableHead>SMAPE (%)</TableHead>
                  <TableHead>MAE</TableHead>
                  <TableHead>MSE</TableHead>
                  <TableHead>RMSE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bottom5.map((performer, index) => (
                  <TableRow key={performer.state}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                          {index + 1}
                        </div>
                        {performer.state}
                      </div>
                    </TableCell>
                    <TableCell>{performer.SMAPE.toFixed(2)}</TableCell>
                    <TableCell>{performer.MAE.toFixed(3)}</TableCell>
                    <TableCell>{performer.MSE.toFixed(3)}</TableCell>
                    <TableCell>{performer.RMSE.toFixed(3)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Model Performance by State</CardTitle>
          <p className="text-sm text-muted-foreground">
            Evaluation metrics for each state (lower is better)
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 font-semibold">State</th>
                  <th className="px-4 py-2 font-semibold">MAE</th>
                  <th className="px-4 py-2 font-semibold">MSE</th>
                  <th className="px-4 py-2 font-semibold">RMSE</th>
                  <th className="px-4 py-2 font-semibold">SMAPE (%)</th>
                </tr>
              </thead>
              <tbody>
                {performanceMetrics.map((row, idx) => (
                  <tr key={row.state} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{row.state}</td>
                    <td className="px-4 py-2">{row.MAE.toFixed(3)}</td>
                    <td className="px-4 py-2">{row.MSE.toFixed(3)}</td>
                    <td className="px-4 py-2">{row.RMSE.toFixed(3)}</td>
                    <td className="px-4 py-2">{row.SMAPE.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Variable Importance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Variable Importance (TFT Model)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Top 15 variables by importance, colored by type (static, encoder, decoder)
          </p>
        </CardHeader>
        <CardContent>
          <div className="w-full" style={{ height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={topVariableImportance}
                margin={{ top: 10, right: 40, left: 100, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="variable" type="category" width={200} />
                <Tooltip formatter={(value: number, name: string, props: any) => value.toFixed(4)} />
                <Bar dataKey="importance">
                  {topVariableImportance.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={variableCategoryColors[entry.category] || '#8884d8'} />
                  ))}
                  <LabelList dataKey="importance" position="right" formatter={(v) => v.toFixed(4)} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{ background: variableCategoryColors.static }}></span>Static</div>
              <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{ background: variableCategoryColors.encoder }}></span>Encoder</div>
              <div className="flex items-center gap-2"><span className="inline-block w-4 h-4 rounded" style={{ background: variableCategoryColors.decoder }}></span>Decoder</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Variable List */}
      <Card>
        <CardHeader>
          <CardTitle>Variable Details</CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed information about each variable used in the model, sorted by importance
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedMergedVariableImportance.map((variable, index) => (
              <div
                key={variable.variable}
                className="flex items-start justify-between p-4 border rounded-xl shadow-md hover:shadow-xl transition-shadow bg-gradient-to-r from-white via-[${getCategoryColor(variable.category)}] to-white"
                style={{ borderLeft: `8px solid ${getCategoryColor(variable.category)}` }}
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full font-extrabold text-lg text-white"
                    style={{ background: getCategoryColor(variable.category), boxShadow: `0 2px 8px 0 ${getCategoryColor(variable.category)}33` }}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-extrabold text-lg text-gray-900 drop-shadow-sm">{variable.variable}</h4>
                      {variable.types && (
                        <span className="inline-flex gap-1">
                          {variable.types.map((type) => (
                            <span key={type} className={`px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-sm ${type === 'static' ? 'bg-indigo-500' : type === 'encoder' ? 'bg-emerald-500' : 'bg-amber-500'}`}>{type}</span>
                          ))}
                        </span>
                      )}
                      <Badge className={getCategoryBadgeColor(variable.category) + ' ml-1 shadow-sm'}>
                        <div className="flex items-center gap-1">
                          {getCategoryIcon(variable.category)}
                          <span className="capitalize font-semibold">{variable.category}</span>
                        </div>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">{variable.description}</p>
                  </div>
                </div>
                <div className="text-right min-w-[80px] flex flex-col items-end">
                  <div className="text-2xl font-extrabold text-gray-800 drop-shadow-sm">{variable.importance}</div>
                  <div className="w-28 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(variable.importance * 20, 100)}%`,
                        background: `linear-gradient(90deg, ${getCategoryColor(variable.category)} 60%, #fff 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Category Summary</CardTitle>
          <p className="text-sm text-muted-foreground">
            Total importance scores by category (provided by model analysis)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTotals.map(({ category, score }) => (
              <div key={category} className="p-4 rounded-xl shadow-md hover:shadow-xl border-0"
                style={{ background: `linear-gradient(120deg, #fff 0%, ${categoryColorPalette[category]}22 100%)` }}>
                  <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(category.toLowerCase())}
                  <h4 className="font-bold capitalize text-lg" style={{ color: categoryColorPalette[category] }}>{category}</h4>
                  </div>
                <div className="text-3xl font-extrabold mb-1" style={{ color: categoryColorPalette[category] }}>{score}</div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">
                  Total importance
                </p>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                      width: `${Math.min((score / categoryTotals[0].score) * 100, 100)}%`,
                      background: categoryColorPalette[category]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Why This Matters Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">📊 Why This Matters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTotals.map(({ category }) => (
                <div key={category} className="p-3 rounded-xl shadow-md"
                  style={{ background: `linear-gradient(120deg, #fff 0%, ${categoryColorPalette[category]}22 100%)` }}>
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(category.toLowerCase())}
                    <span className="font-bold capitalize" style={{ color: categoryColorPalette[category] }}>{category}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {categoryExplanations[category]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelInsights;
