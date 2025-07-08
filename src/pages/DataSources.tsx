import React from "react";
import { ExternalLink } from "lucide-react";

const dataSources = [
  {
    emoji: "🦠",
    title: "COVID-19 Cases Data",
    source: "Ministry of Health Malaysia",
    files: "cases_state.csv",
    description: "Daily reported new COVID-19 cases by state.",
    use: "Main target variable, lag features, and rolling averages.",
    link: "https://github.com/MoH-Malaysia/covid19-public"
  },
  {
    emoji: "💉",
    title: "Vaccination Data",
    source: "MOH GitHub – Vaccination",
    files: "vax_state.csv",
    description: "Daily vaccination statistics including first, second, and booster doses.",
    use: "Lagged booster doses per 100k population to capture delayed vaccine effects.",
    link: "https://github.com/MoH-Malaysia/covid19-public/tree/main/vaccination"
  },
  {
    emoji: "🏥",
    title: "Hospitalization & Healthcare Capacity",
    source: "MOH GitHub – Epidemic",
    files: "hospital.csv",
    description: "Daily hospital, ICU, and quarantine centre capacity and utilization by state.",
    use: "Smoothed healthcare utilization as a feature indicating healthcare strain.",
    link: "https://github.com/MoH-Malaysia/covid19-public/tree/main/epidemic"
  },
  {
    emoji: "🚶",
    title: "Mobility Data",
    source: "Google COVID-19 Community Mobility Reports",
    files: "2021_MY_Region_Mobility_Report.csv, 2022_MY_Region_Mobility_Report.csv",
    description: "State-level percentage change in visits to places like retail, parks, and workplaces.",
    use: "Known covariates to model behavioural and movement trends affecting transmission.",
    link: "https://health.google.com/covid-19/open-data/raw-data?loc=MY"
  },
  {
    emoji: "🏛️",
    title: "Policy Interventions",
    source: "Oxford COVID-19 Government Response Tracker (OxCGRT)",
    files: "oxford-government-response.csv",
    description: "National-level summary of government responses, including stringency index, compiled by the University of Oxford.",
    use: "Known covariates to model behavioural and policy intervention trends affecting disease transmission.",
    link: "https://github.com/GoogleCloudPlatform/covid-19-open-data/blob/main/docs/table-government-response.md"
  },
  {
    emoji: "📈",
    title: "Reproduction Rate (Rt)",
    source: "Our World in Data",
    files: "estimate-of-the-effective-reproduction-rate-r-of-covid-19.csv",
    description: "National-level estimates of the COVID-19 effective reproduction rate from 2020 to 2023.",
    use: "Optional signal for national-level transmission dynamics.",
    link: "https://ourworldindata.org/coronavirus#explore-our-data-on-covid-19"
  },
  {
    emoji: "📅",
    title: "Holiday Data",
    source: "Official Malaysian Public Holiday Calendar (manually compiled)",
    files: "holiday.csv",
    description: "Annotated national and state-level holidays, including types (religious, public).",
    use: "Categorical variable and binary flag for modeling calendar effects on human activity and case surges.",
    link: "https://publicholidays.com.my/"
  }
];

const DataSources: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">    
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2" tabIndex={0} aria-label="Data Sources">📚 Data Sources</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">This project integrates multiple data sources to capture the dynamics of COVID-19 outbreaks at the Malaysian state level. Each source provides relevant signals for both short-term forecasting and long-term trend modelling using the Temporal Fusion Transformer (TFT).</p>
      <section className="space-y-6">
        {dataSources.map((ds, idx) => (
          <article key={ds.title} className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 border border-gray-200 dark:border-gray-700" aria-labelledby={`ds-title-${idx}` }> 
            <header className="flex items-center gap-2 mb-2">
              <span className="text-2xl" aria-hidden="true">{ds.emoji}</span>
              <h2 id={`ds-title-${idx}`} className="text-xl font-semibold">{ds.title}</h2>
              <a href={ds.link} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <ExternalLink className="w-4 h-4" />
              </a>
            </header>
            <ul className="mb-2 text-sm text-gray-700 dark:text-gray-300">
              <li><span className="font-semibold">Source:</span> {ds.source}</li>
              <li><span className="font-semibold">Files Used:</span> <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">{ds.files}</code></li>
            </ul>
            <p className="mb-1 text-gray-700 dark:text-gray-300"><span className="font-semibold">Description:</span> {ds.description}</p>
            <p className="italic text-cyan-700 dark:text-cyan-300"><span className="font-semibold not-italic">Use:</span> {ds.use}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default DataSources; 