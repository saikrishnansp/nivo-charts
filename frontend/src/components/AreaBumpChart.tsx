import React, { useEffect, useState } from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { fetchChart } from "../api/api";

export default function AreaBumpChart() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChart("areaBump")
      .then((res) => setData(res.data))
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <div className="card">Error: {error}</div>;
  if (!data) return <div className="card">Loading AreaBump…</div>;

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
