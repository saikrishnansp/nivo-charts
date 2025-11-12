import React, { useEffect, useState } from "react";
import { ResponsiveChord } from "@nivo/chord";
import { fetchChart } from "../api/api";

export default function ChordChart() {
  const [chart, setChart] = useState<{ matrix?: number[][]; keys?: string[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchChart("chord")
      .then((r) => {
        console.log("chord raw response:", r);
        const payload = r && (r.data ?? r);
        console.log("chord normalized payload:", payload);
        setChart(payload ?? null);
      })
      .catch((e) => {
        console.error("chord fetch error:", e);
        setErr(String(e));
      });
  }, []);

  if (err) return <div className="card">Error: {err}</div>;
  if (!chart) return <div className="card">Loading Chord…</div>;

  const { matrix, keys } = chart;
  const isMatrix =
    Array.isArray(matrix) &&
    matrix.length > 0 &&
    matrix.every((row) => Array.isArray(row) && row.length === matrix.length && row.every((v) => typeof v === "number"));
  const isKeys = Array.isArray(keys) && keys.length === matrix?.length && keys.every((k) => typeof k === "string");

  if (!isMatrix || !isKeys) {
    console.warn("Chord chart invalid payload:", { matrix, keys });
    return (
      <div className="card">
        <div className="header">Chord Diagram</div>
        <div className="chartArea">
          Invalid chord data. Check backend payload shape in console.
          <pre style={{whiteSpace:"pre-wrap", marginTop:8}}>{JSON.stringify({ matrix, keys }, null, 2)}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="header">Chord Diagram</div>
      <div className="chartArea" style={{ height: 420 }}>
        <ResponsiveChord
          matrix={matrix}
          keys={keys}
          padAngle={0.02}
          innerRadiusRatio={0.96}
          colors={{ scheme: "category10" }}
        />
      </div>
    </div>
  );
}
