import React, { Component } from "react";
import RadarChart from "./radarChart";
import CoordinateChart from "./coordinateChart";
import LineChart from "./lineChart";
import ForceDirectedGraph from "./forceDirectedGraph";

class Radar extends Component {
  model = {
    width: 500,
    height: 500
  };
  state = {};

  renderPage() {
    const { width, height } = this.model;
    switch (this.props.page) {
      case "profile":
        return <RadarChart width={width} height={height} />;
      case "tracking":
        return <CoordinateChart width={width} height={height} />;
      case "possibility":
        return <LineChart width={width} height={height} />;
      case "topology":
        return <ForceDirectedGraph width={width} height={height} />;
      default:
        break;
    }
  }

  render() {
    const { width, height } = this.model;
    return (
      <svg
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
      >
        {this.renderPage()}
      </svg>
    );
  }
}

export default Radar;
