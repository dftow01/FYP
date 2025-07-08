import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Info, LineChart, Shield, Terminal } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">About the System</h2>
        <p className="text-muted-foreground">
          Learn how our COVID-19 prediction model works and the data behind it
        </p>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="grid grid-cols-4 h-auto">
          <TabsTrigger value="about" className="flex flex-col gap-1 py-2 h-auto">
            <Info className="h-4 w-4" />
            <span className="text-xs">About</span>
          </TabsTrigger>
          <TabsTrigger value="prediction" className="flex flex-col gap-1 py-2 h-auto">
            <LineChart className="h-4 w-4" />
            <span className="text-xs">Prediction Model</span>
          </TabsTrigger>
          <TabsTrigger value="disclaimer" className="flex flex-col gap-1 py-2 h-auto">
            <Shield className="h-4 w-4" />
            <span className="text-xs">Disclaimer</span>
          </TabsTrigger>
          <TabsTrigger value="tech" className="flex flex-col gap-1 py-2 h-auto">
            <Terminal className="h-4 w-4" />
            <span className="text-xs">Technology</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="about">
            <Card className="bg-gradient-to-br from-white via-blue-50 to-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-extrabold flex items-center gap-2 text-blue-800">
                  <span className="inline-block bg-blue-100 rounded-full p-2"><Info className="h-5 w-5 text-blue-700" /></span>
                  About the COVID-19 Prediction System
                </CardTitle>
                <CardDescription className="text-blue-700 font-semibold">
                  A state-level forecasting system for Malaysia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-base text-gray-700 leading-relaxed">
                  The Malaysia COVID-19 Outbreak Prediction System is a public health initiative designed to provide accurate forecasts of COVID-19 cases across all states and federal territories in Malaysia. This system aims to help citizens, healthcare providers, and policymakers make informed decisions based on data-driven predictions.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white shadow-sm">
                    <span className="text-2xl">🌏</span>
                    <div>
                      <h4 className="font-bold text-blue-800 mb-1">Comprehensive Coverage</h4>
                      <p className="text-gray-700">Our dashboard provides 7-day forecasts for each state, historical trend analysis, hospitalization data, and an AI assistant to answer COVID-19 related questions. The system is updated daily with the latest available data from the Ministry of Health Malaysia.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-white shadow-sm">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">Empowering Malaysians</h4>
                      <p className="text-gray-700">By making this information easily accessible and understandable, we hope to increase public awareness and help Malaysians stay informed about the COVID-19 situation in their state and across the country.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prediction">
            <Card className="bg-gradient-to-br from-white via-blue-50 to-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-extrabold flex items-center gap-2 text-blue-800">
                  <span className="inline-block bg-blue-100 rounded-full p-2"><span role="img" aria-label="search">🔍</span></span>
                  Prediction Model Methodology
                </CardTitle>
                <CardDescription className="text-blue-700 font-semibold">
                  How our AI forecasting system works
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-base text-gray-700 leading-relaxed">
                  Our forecasting system leverages state-of-the-art deep learning techniques to predict COVID-19 case trends across Malaysian states. At its core, the model is powered by the <span className="font-bold text-blue-700">Temporal Fusion Transformer (TFT)</span> — an advanced neural network architecture designed specifically for interpretable time series forecasting.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white shadow-sm">
                      <span className="text-2xl">📈</span>
                      <div>
                        <h4 className="font-bold text-blue-800 mb-1">Temporal Deep Learning</h4>
                        <p className="text-gray-700">We use the Temporal Fusion Transformer (TFT), which excels at capturing both short- and long-term patterns in multivariate time series data. It processes a wide range of signals — past case trends, future known events (e.g., holidays), and static features like population — to make accurate and explainable forecasts.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-white shadow-sm">
                      <span className="text-2xl">🧠</span>
                      <div>
                        <h4 className="font-bold text-purple-800 mb-1">Attention-Based Interpretation</h4>
                        <p className="text-gray-700">Unlike black-box models, TFT uses attention mechanisms to identify and rank the most influential features, allowing us to understand which variables (e.g., vaccination rates, mobility, policy stringency) drive future case changes.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-white shadow-sm">
                      <span className="text-2xl">🧩</span>
                      <div>
                        <h4 className="font-bold text-green-800 mb-1">Feature Integration</h4>
                        <ul className="list-disc pl-6 mt-1 text-gray-700">
                          <li><b>Epidemiological Data:</b> Confirmed cases, deaths, recoveries, and reproduction rates</li>
                          <li><b>Vaccination Rates:</b> Full and booster coverage</li>
                          <li><b>Mobility Trends:</b> Changes in movement to workplaces, retail, and transit</li>
                          <li><b>Policy Measures:</b> Stringency index, holidays, and lockdown periods</li>
                          <li><b>Demographics:</b> State identity and population size</li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-white shadow-sm">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h4 className="font-bold text-pink-800 mb-1">Continuous Learning & Evaluation</h4>
                        <p className="text-gray-700">The model is trained on historical data and regularly validated against actual case numbers. It currently achieves a Symmetric Mean Absolute Percentage Error (SMAPE) of approximately <span className="font-bold">X%</span> for 7-day state-level forecasts (update with your actual value), with performance improving as more recent data is integrated.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-100 via-green-50 to-white shadow-inner">
                  <h4 className="font-bold text-lg text-blue-900 mb-2 flex items-center gap-2">✅ Why It Matters</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-800">
                    <li>Public health planners prepare for upcoming case surges</li>
                    <li>Policy makers understand what factors (e.g., mobility, vaccination) are influencing transmission</li>
                    <li>The public stay informed with transparent, evidence-based forecasts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="disclaimer">
            <Card className="bg-gradient-to-br from-white via-yellow-50 to-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-extrabold flex items-center gap-2 text-yellow-800">
                  <span className="inline-block bg-yellow-100 rounded-full p-2"><Shield className="h-5 w-5 text-yellow-700" /></span>
                  Disclaimer and Limitations
                </CardTitle>
                <CardDescription className="text-yellow-700 font-semibold">
                  Important information about our predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    This prediction system is provided for informational purposes only and should not be used as the sole basis for medical decisions.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-white shadow-sm">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <h4 className="font-bold text-yellow-800 mb-1">Forecast Limitations</h4>
                      <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Predictions are based on available data and may change as new information becomes available.</li>
                        <li>The model cannot account for sudden policy changes, unexpected events, or new virus variants.</li>
                        <li>Forecast accuracy typically decreases the further into the future the prediction extends.</li>
                        <li>Reporting delays and inconsistencies in data collection methods can affect prediction quality.</li>
                        <li>The system does not provide personalized medical advice or replace guidance from health authorities.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-red-50 to-white shadow-sm">
                    <span className="text-2xl">🩺</span>
                    <div>
                      <h4 className="font-bold text-red-800 mb-1">Health Guidance</h4>
                      <p className="text-gray-700">Always follow the latest guidelines and advisories from the Ministry of Health Malaysia and local health authorities. For medical concerns, consult with healthcare professionals.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tech">
            <Card className="bg-gradient-to-br from-white via-purple-50 to-white shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-extrabold flex items-center gap-2 text-purple-800">
                  <span className="inline-block bg-purple-100 rounded-full p-2"><Terminal className="h-5 w-5 text-purple-700" /></span>
                  Technology Stack
                </CardTitle>
                <CardDescription className="text-purple-700 font-semibold">
                  The technical architecture behind our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-base text-gray-700 leading-relaxed">
                  The Malaysia COVID-19 Outbreak Prediction System is built using a modern, cloud-powered stack for scalable, accurate, and accessible forecasting:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-white shadow-sm">
                      <span className="text-2xl">💻</span>
                      <div>
                        <h4 className="font-bold text-blue-800 mb-1">Frontend</h4>
                        <ul className="list-disc pl-6 mt-1 text-gray-700">
                          <li><b>React + TypeScript</b> – Component-based development for a scalable and maintainable UI</li>
                          <li><b>Tailwind CSS</b> – Utility-first CSS framework for custom responsive styling</li>
                          <li><b>ShadCN UI</b> – Accessible and consistent UI components for modern design</li>
                          <li><b>Recharts</b> – Interactive data visualizations of COVID-19 trends and forecasts</li>
                          <li><b>React Query</b> – Smart data fetching and caching for responsive user experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-white shadow-sm">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <h4 className="font-bold text-purple-800 mb-1">AI/ML Pipeline</h4>
                        <ul className="list-disc pl-6 mt-1 text-gray-700">
                          <li><b>Google Colab</b> – Cloud-based environment for data preprocessing and model training</li>
                          <li><b>PyTorch Forecasting</b> – Implements the Temporal Fusion Transformer (TFT) for deep learning time series forecasting</li>
                          <li><b>PyTorch</b> – For model architecture and GPU-accelerated computation</li>
                          <li><b>Optuna</b> – Hyperparameter tuning for optimal model performance</li>
                          <li><b>Weights & Biases (W&B)</b> – For logging experiments, visualizing training, and performance monitoring</li>
                          <li><b>NVIDIA A100 GPU</b> – Utilized via Colab Pro+ for accelerated training on large datasets</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-white shadow-sm">
                  <span className="text-2xl">🗃️</span>
                  <div>
                    <h4 className="font-bold text-pink-800 mb-1">Data Storage & Delivery</h4>
                    <ul className="list-disc pl-6 mt-1 text-gray-700">
                      <li><b>Firebase Firestore</b> – Cloud NoSQL database to store daily forecast results and historical data</li>
                      <li><b>Manual Upload from Colab</b> – Processed prediction outputs are uploaded directly to Firestore from Colab notebooks</li>
                      <li><b>Firebase Hosting</b> – Deploys the frontend as a globally accessible and fast web application</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default About;
