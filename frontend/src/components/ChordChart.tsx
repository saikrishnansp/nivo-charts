import { ResponsiveChord } from "@nivo/chord";
import { useEffect, useState } from "react";
import { fetchChart } from "../api/api";

export default function ChordChart() {
  // State to store the chart data
  const [chart, setChart] = useState<{
    matrix?: number[][];
    keys?: string[];
  } | null>(null);
  // State to store any error that occurs during data fetching
  const [err, setErr] = useState<string | null>(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    // Fetch the data for the "chord" chart
    fetchChart("chord")
      .then((r) => {
        // Extract the data from the response
        const payload = r && (r.data ?? r);
        console.log("Chord API Response:", r);
        console.log("Chord Payload:", payload);
        // Validate the payload has required properties
        if (payload && payload.matrix && payload.keys) {
          console.log("Chord data valid - Setting chart state");
          setChart(payload);
        } else {
          console.error(
            "Chord data missing required fields. Expected 'matrix' and 'keys'",
            payload
          );
          setErr("Invalid chord data from server - missing matrix or keys");
        }
      })
      .catch((e) => {
        // If there's an error, set the error in the state
        console.error("Chord fetch error:", e);
        setErr(String(e));
      });
  }, []);

  // If there's an error, display the error message
  if (err) return <div className="card">Error: {err}</div>;
  // If the data is not yet loaded, display a loading message
  if (!chart) return <div className="card">Loading Chord…</div>;

  const { matrix, keys } = chart;
  // Validate the matrix data
  const isMatrix =
    Array.isArray(matrix) &&
    matrix.length > 0 &&
    matrix.every(
      (row) =>
        Array.isArray(row) &&
        row.length === matrix.length &&
        row.every((v) => typeof v === "number")
    );
  // Validate the keys data
  const isKeys =
    Array.isArray(keys) &&
    keys.length === matrix?.length &&
    keys.every((k) => typeof k === "string");

  // If the data is not valid, display an error message
  if (!isMatrix || !isKeys) {
    return (
      <div className="card">
        <div className="header">Chord Diagram</div>
        <div className="chartArea">
          Invalid chord data. Check backend payload shape in console.
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
            {JSON.stringify({ matrix, keys }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  // Render the Chord chart
  console.log("Rendering chord with matrix:", matrix, "and keys:", keys);
  return (
    <div className="card">
      <div className="header">Chord Diagram</div>
      <div className="chartArea" style={{ height: 420 }}>
        <ResponsiveChord
          data={matrix}
          keys={keys}
          padAngle={0.02}
          innerRadiusRatio={0.96}
          colors={{ scheme: "category10" }}
        />
      </div>
    </div>
  );
}
