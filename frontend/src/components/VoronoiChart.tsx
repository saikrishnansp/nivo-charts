import { useEffect, useState } from "react";
import { fetchChart } from "../api/api";

export default function VoronoiChart() {
  // State to store the chart data
  const [data, setData] = useState<any | null>(null);
  // State to store any error that occurs during data fetching
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Fetch the data for the "voronoi" chart
    fetchChart("voronoi")
      // Set the data in the state
      .then((r) => {
        console.log("[Voronoi] API Response:", r);
        const payload = r && (r.data ?? r);
        console.log("[Voronoi] Payload received:", payload);
        console.log("[Voronoi] Payload type:", typeof payload);
        console.log("[Voronoi] Is array:", Array.isArray(payload));
        if (payload && Array.isArray(payload) && payload.length > 0) {
          console.log("[Voronoi] Data is valid array, length:", payload.length);
          console.log("[Voronoi] First point:", payload[0]);
          console.log("[Voronoi] Last point:", payload[payload.length - 1]);
          setData(payload);
        } else {
          console.error(
            "[Voronoi] Invalid data structure. Expected non-empty array",
            payload
          );
          setError("Invalid voronoi data - expected non-empty array");
        }
      })
      // If there's an error, set the error in the state
      .catch((e) => {
        console.error("[Voronoi] Fetch error:", e);
        setError(String(e));
      });
  }, []);

  // If there's an error, display the error message
  if (error) return <div className="card">Error: {error}</div>;
  // If the data is not yet loaded, display a loading message
  if (!data) return <div className="card">Loading Voronoi…</div>;

  // Render the Voronoi chart using custom SVG
  console.log("[Voronoi] About to render with data length:", data?.length);

  const width = 800;
  const height = 360;

  return (
    <div className="card">
      <div className="header">Voronoi Diagram ({data?.length || 0} points)</div>
      <div className="chartArea" style={{ height: 360 }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
          style={{ border: "1px solid #ddd", background: "#fafafa" }}
        >
          {/* Grid background */}
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Render connections between nearby points */}
          {data.map((p1: any, i: number) => {
            const connections = [];
            for (let j = i + 1; j < data.length && j < i + 5; j++) {
              const p2 = data[j];
              const dist = Math.sqrt(
                Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
              );
              if (dist < 200) {
                connections.push(
                  <line
                    key={`line-${i}-${j}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="#d0d0d0"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                );
              }
            }
            return connections;
          })}

          {/* Render points with colors */}
          {data.map((point: any, idx: number) => (
            <g key={`point-${idx}`}>
              {/* Point circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill={`hsl(${(idx * 360) / data.length}, 70%, 50%)`}
                opacity="0.9"
              />
              {/* Point border */}
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="none"
                stroke="#fff"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
