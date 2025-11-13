import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useEffect, useState } from "react";
import { fetchChart } from "../api/api";

export default function CirclePackingChart() {
  // State to store the chart data
  const [data, setData] = useState<any | null>(null);
  // State to store any error that occurs during data fetching
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Fetch the data for the "circlepacking" chart
    fetchChart("circlepacking")
      .then((r) => {
        console.log("[CirclePacking] API Response:", r);
        const payload = r && (r.data ?? r);
        console.log("[CirclePacking] Payload received:", payload);
        console.log("[CirclePacking] Payload type:", typeof payload);
        console.log(
          "[CirclePacking] Payload keys:",
          payload ? Object.keys(payload) : "null"
        );
        if (payload && payload.name && payload.children) {
          console.log("[CirclePacking] Data structure valid, setting data");
          setData(payload);
        } else {
          console.error(
            "[CirclePacking] Invalid data structure. Expected 'name' and 'children'",
            payload
          );
          setError("Invalid circle packing data - missing required fields");
        }
      })
      .catch((e) => {
        console.error("[CirclePacking] Fetch error:", e);
        setError(String(e));
      });
  }, []);

  // If there's an error, display the error message
  if (error) return <div className="card">Error: {error}</div>;
  // If the data is not yet loaded, display a loading message
  if (!data) return <div className="card">Loading Circle Packing…</div>;

  // Render the CirclePacking chart
  console.log("[CirclePacking] Rendering with data:", data);
  try {
    return (
      <div className="card">
        <div className="header">Circle Packing</div>
        <div className="chartArea" style={{ height: 420 }}>
          <ResponsiveCirclePacking
            data={data}
            id="name"
            value="value"
            colors={{ scheme: "nivo" }}
            padding={6}
            leavesOnly={false}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering CirclePackingChart:", error);
    return <div className="card">Error rendering chart.</div>;
  }
}
