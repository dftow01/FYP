import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { useTheme } from "./theme-provider";
import { MapContainer, TileLayer, Marker, Popup, Circle, ZoomControl } from "react-leaflet";
import { usePredictionData } from "@/hooks/usePredictionData";
import type { PredictionData } from "@/hooks/usePredictionData";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons not showing in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MalaysiaMapProps {
  onSelectState: (state: string) => void;
}

export const MalaysiaMap = ({ onSelectState }: MalaysiaMapProps) => {
  const { theme } = useTheme();
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const { data: predictions, isLoading, error } = usePredictionData();

  useEffect(() => {
    // Simulate map loading time
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Malaysia center coordinates (more accurate)
  const malaysiaCenter: [number, number] = [4.2105, 108.9758];

  // Malaysia bounds to restrict map view
  const malaysiaBounds: L.LatLngBoundsExpression = [
    [0.5, 99.5], // Southwest corner (south of Johor, west of Perlis)
    [7.5, 119.5] // Northeast corner (north of Sabah, east of Sarawak)
  ];

  // More accurate state coordinates for Malaysia
  const stateCoordinates: Record<string, [number, number]> = {
    "Johor": [1.4927, 103.7414],
    "Kedah": [6.1184, 100.3685],
    "Kelantan": [6.1254, 102.2386],
    "Melaka": [2.1896, 102.2501],
    "Negeri Sembilan": [2.7258, 102.2377],
    "Pahang": [3.8126, 103.3256],
    "Perak": [4.5921, 101.0901],
    "Perlis": [6.4449, 100.2175],
    "Pulau Pinang": [5.4141, 100.3288],
    "Sabah": [5.9804, 116.0735],
    "Sarawak": [1.5533, 110.3592],
    "Selangor": [3.0738, 101.5183],
    "Terengganu": [5.3117, 103.1324],
    "W.P. Kuala Lumpur": [3.1390, 101.6869],
    "W.P. Labuan": [5.2831, 115.2308],
    "W.P. Putrajaya": [2.9264, 101.6964],
  };

  // Hard code: For each state, use the prediction with the latest date
  const stateData = (() => {
    if (!predictions) return {};
    const result: Record<string, { level: string; cases: number; coordinates: [number, number] }> = {};
    for (const state of Object.keys(stateCoordinates)) {
      // Get all predictions for this state
      const preds = predictions.filter(p => p.state === state && p.date);
      if (preds.length === 0) continue;
      // Find the prediction with the latest date (as string compare)
      let latest = preds[0];
      for (const p of preds) {
        if (String(p.date) > String(latest.date)) latest = p;
      }
      const cases = latest.prediction ?? 0;
      let level = "low";
      if (cases > 300) level = "critical";
      else if (cases > 200) level = "high";
      else if (cases > 100) level = "medium";
      result[state] = {
        level,
        cases,
        coordinates: stateCoordinates[state] || [0, 0],
      };
    }
    return result;
  })();

  const getRiskColor = (level: string): string => {
    switch (level) {
      case "critical": return "#ef4444";
      case "high": return "#f59e0b";
      case "medium": return "#14b8a6";
      default: return "#60a5fa";
    }
  };

  const getRiskColorClass = (level: string): string => {
    switch (level) {
      case "critical": return "bg-covid-red";
      case "high": return "bg-covid-amber";
      case "medium": return "bg-covid-teal";
      default: return "bg-covid-blue";
    }
  };

  const handleStateClick = (stateName: string) => {
    onSelectState(stateName);
    setHoveredState(stateName);
  };

  const handleMouseOver = (
    event: React.MouseEvent<HTMLDivElement>,
    stateName: string
  ) => {
    setHoveredState(stateName);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY - 100,
    });
  };

  const handleMouseOut = () => {
    setHoveredState(null);
  };

  // Get circle size based on case count (adjusted for Malaysia's scale)
  const getCircleSize = (cases: number) => {
    return Math.max(cases * 30, 3000); // Reduced multiplier for better visibility
  };

  // Get circle opacity based on risk level
  const getCircleOpacity = (level: string) => {
    switch (level) {
      case "critical": return 0.6;
      case "high": return 0.5;
      case "medium": return 0.4;
      default: return 0.3;
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        <p className="ml-3 text-muted-foreground">Loading prediction data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <p className="text-destructive">Error loading prediction data</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      <div className={`w-full h-full transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <MapContainer 
          center={malaysiaCenter}
          zoom={6} 
          style={{ height: '600px', width: '100%' }}
          zoomControl={false}
          ref={mapRef}
          minZoom={5}
          maxZoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          
          {Object.entries(stateData).map(([stateName, data]) => (
            <div key={stateName}>
              <Circle
                center={data.coordinates}
                radius={getCircleSize(data.cases)}
                pathOptions={{
                  color: getRiskColor(data.level),
                  fillColor: getRiskColor(data.level),
                  fillOpacity: getCircleOpacity(data.level),
                  weight: 1,
                }}
                eventHandlers={{
                  click: () => handleStateClick(stateName),
                  mouseover: (e) => {
                    e.target.setStyle({ 
                      fillOpacity: getCircleOpacity(data.level) + 0.2,
                      weight: 3
                    });
                    handleMouseOver(e.originalEvent as unknown as React.MouseEvent<HTMLDivElement>, stateName);
                  },
                  mouseout: (e) => {
                    e.target.setStyle({ 
                      fillOpacity: getCircleOpacity(data.level),
                      weight: 2
                    });
                    handleMouseOut();
                  },
                }}
              />
              <Marker 
                position={data.coordinates}
                eventHandlers={{
                  click: () => handleStateClick(stateName)
                }}
              >
                <Popup>
                  <div className="font-semibold text-sm">{stateName}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Predicted Cases: {data.cases.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <span
                      className={`inline-block w-3 h-3 rounded-full ${getRiskColorClass(data.level)}`}
                    ></span>
                    <span className="capitalize">{data.level} Risk</span>
                  </div>
                </Popup>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>

      
      {/* Map attribution */}
      <div className="absolute bottom-4 left-4 text-[10px] text-gray-500 dark:text-gray-400 z-[400] bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded backdrop-blur-sm">
        Malaysia COVID-19 Forecasting Map © 2025
      </div>
    </div>
  );
};
