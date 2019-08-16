import React, { Component } from "react";
import PossibleNumber from "./possibleNumber";
import PossibleLine from "./possibileLine";
import { getTheshold } from "../uitilities/mouseOver";

class LineChart extends Component {
  rect = {
    width: 400,
    height: 480
  };
  timer = null;
  duration = 2000;
  state = {
    possibility: {
      latest: 0,
      theshold: 0
    }
  };

  componentDidMount() {
    const { possibility } = { ...this.state };
    const that = this;
    this.timer = setInterval(() => {
      possibility.latest = ~~(Math.random() * 101);
      possibility.theshold = getTheshold() === null ? 0 : getTheshold();
      that.setState({ possibility });
    }, this.duration);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { latest, theshold } = this.state.possibility;
    const { width, height } = this.props;
    const { width: rw, height: rh } = this.rect;
    return (
      <React.Fragment>
        <defs>
          <filter id="roller-shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#181942" />
          </filter>
          <linearGradient id="roller-gradient-green">
            <stop offset="0%" stopColor="#81f2d9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roller-gradient-red">
            <stop offset="0%" stopColor="#e7c4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <marker
            id="roller-point"
            viewBox="0 0 16 16"
            refX="8"
            refY="8"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <circle
              fill="#fff"
              stroke="#81f2d9"
              strokeWidth="1"
              cx="8"
              cy="8"
              r="3"
            />
          </marker>
        </defs>
        <g transform={`translate(${(width - rw) / 2}, ${(height - rh) / 2})`}>
          <rect
            width={rw}
            height={rh}
            x="0"
            y="0"
            rx="10"
            fill="#2d3796"
            opacity="0.4"
            filter="url(#roller-shadow)"
          />
          <g transform={`translate(50, 40)`}>
            <PossibleNumber
              label="LATEST"
              color="#81f2d9"
              gradient="roller-gradient-green"
              possibility={latest}
            />
          </g>
          <g transform={`translate(110, 140)`}>
            <PossibleNumber
              label="THESHOLD"
              color="#e7c4ff"
              gradient="roller-gradient-red"
              possibility={theshold}
            />
          </g>
          <g transform={`translate(20, ${rh / 2})`}>
            <PossibleLine
              width={rw - 40}
              height={rh / 2 - 20}
              possibility={latest}
              duration={this.duration}
              point={"roller-point"}
            />
          </g>
        </g>
      </React.Fragment>
    );
  }
}

export default LineChart;
