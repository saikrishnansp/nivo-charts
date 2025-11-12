import React, { useEffect, useState } from "react";
import { ResponsiveNetwork } from "@nivo/network";
import { fetchChart } from "../api/api";

export default function NetworkChart() {
  const [graph, setGraph] = useState<any | null>(null);
  useEffect(() => {
    fetchChart("network").then(r => setGraph(r.data)).catch(() => setGraph(null));
  }, []);

  if (!graph) return <div className="card">Loading Network…</div>;

  return (
    <div className="card">
      <div className="header">Network</div>
      <div className="chartArea" style={{ height: 480 }}>
        <ResponsiveNetwork
          nodes={graph.nodes}
          links={graph.links}
          repulsions={40}
          linkDistance={40}
          nodeSize={node => node.size ?? 6}
          colors={{ scheme: "category10" }}
          motionConfig="gentle"
        />
      </div>
    </div>
  );
}
