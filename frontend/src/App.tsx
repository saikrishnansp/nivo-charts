import React from "react";
import "./index.css";
import AreaBumpChart from "./components/AreaBumpChart";
import ChordChart from "./components/ChordChart";
import VoronoiChart from "./components/VoronoiChart";
import CirclePackingChart from "./components/CirclePackingChart";
import NetworkChart from "./components/NetworkChart";

export default function App() {
  return (
    <div className="app">
      <header className="appHeader">Nivo Dashboard</header>
      <main className="grid">
        <div className="col">
          <AreaBumpChart />
          <ChordChart />
        </div>
        <div className="col">
          <VoronoiChart />
          <CirclePackingChart />
        </div>
        <div className="col">
          <NetworkChart />
        </div>
      </main>
    </div>
  );
}
