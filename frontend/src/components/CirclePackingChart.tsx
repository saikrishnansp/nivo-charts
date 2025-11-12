import React, { useEffect, useState } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { fetchChart } from "../api/api";

export default function CirclePackingChart() {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    fetchChart("circlePacking").then(r => setData(r.data)).catch(() => setData(null));
  }, []);

  if (!data) return <div className="card">Loading Circle Packing…</div>;

  return (
    <div className="card">
      <div className="header">Circle Packing</div>
      <div className="chartArea" style={{ height: 420 }}>
        <ResponsiveCirclePacking
          root={data}
          id="name"
          value="value"
          colors={{ scheme: "nivo" }}
          padding={6}
          leavesOnly={false}
        />
      </div>
    </div>
  );
}
