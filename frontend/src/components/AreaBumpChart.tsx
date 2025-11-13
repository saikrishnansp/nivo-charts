import React, { useEffect, useState } from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { fetchChart } from "../api/api";

export default function AreaBumpChart() {
  // State to store the chart data
  const [data, setData] = useState<any[] | null>(null);
  // State to store any error that occurs during data fetching
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Fetch the data for the "areaBump" chart
    fetchChart("areaBump")
      // Set the data in the state
      .then((res) => setData(res.data))
      // If there's an error, set the error in the state
      .catch((e) => setError(String(e)));
  }, []);

  // If there's an error, display the error message
  if (error) return <div className="card">Error: {error}</div>;
  // If the data is not yet loaded, display a loading message
  if (!data) return <div className="card">Loading AreaBump…</div>;

  // Render the AreaBump chart
  return (
    <div className="card">
      <div className="header">Area Bump</div>
      <div className="chartArea" style={{ height: 320 }}>
        <ResponsiveAreaBump
          data={data}
          spacing={8}
          curve="catmullRom"
          margin={{ top: 20, right: 30, bottom: 60, left: 30 }}
          colors={{ scheme: "nivo" }}
          axisBottom={{ tickRotation: -45 }}
        />
      </div>
    </div>
  );
}
