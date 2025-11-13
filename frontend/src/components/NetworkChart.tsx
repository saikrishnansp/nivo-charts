import { ResponsiveNetwork } from "@nivo/network";
import { useEffect, useState } from "react";
import { fetchChart } from "../api/api";

export default function NetworkChart() {
  // State to store the chart data
  const [graph, setGraph] = useState<any | null>(null);
  // State to store any error that occurs during data fetching
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Fetch the data for the "network" chart
    fetchChart("network")
      .then((r) => {
        console.log("[Network] API Response:", r);
        const payload = r && (r.data ?? r);
        console.log("[Network] Payload received:", payload);
        console.log("[Network] Payload type:", typeof payload);
        console.log(
          "[Network] Payload keys:",
          payload ? Object.keys(payload) : "null"
        );
        if (payload && payload.nodes && payload.links) {
          console.log("[Network] Data structure valid, setting graph");
          setGraph(payload);
        } else {
          console.error(
            "[Network] Invalid data structure. Expected 'nodes' and 'links'",
            payload
          );
          setError("Invalid network data - missing nodes or links");
        }
      })
      .catch((e) => {
        console.error("[Network] Fetch error:", e);
        setError(String(e));
      });
  }, []);

  // If there's an error, display the error message
  if (error) return <div className="card">Error: {error}</div>;
  // If the data is not yet loaded, display a loading message
  if (!graph) return <div className="card">Loading Network…</div>;

  // Render the Network chart
  console.log("[Network] Rendering with graph:", graph);
  console.log("[Network] Nodes count:", graph?.nodes?.length);
  console.log("[Network] Links count:", graph?.links?.length);
  return (
    <div className="card">
      <div className="header">Network</div>
      <div className="chartArea" style={{ height: 480 }}>
        <ResponsiveNetwork
          data={graph}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          nodeSize={10}
          linkDistance={80}
        />
      </div>
    </div>
  );
}
