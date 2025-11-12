import React, { useEffect, useState } from "react";
import { ResponsiveVoronoi } from "@nivo/voronoi";
import { fetchChart } from "../api/api";

export default function VoronoiChart() {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    fetchChart("voronoi").then(r => setData(r.data)).catch(() => setData(null));
  }, []);

  if (!data) return <div className="card">Loading Voronoi…</div>;

  return (
    <div className="card">
      <div className="header">Voronoi</div>
      <div className="chartArea" style={{ height: 360 }}>
        <ResponsiveVoronoi
          data={data.nodes}
          x="x"
          y="y"
          cellLineWidth={1}
          cellLineColor="#ddd"
          colors={{ scheme: "nivo" }}
          enableSiteDots={true}
          siteSize={4}
          siteColor="#222"
        />
      </div>
    </div>
  );
}
