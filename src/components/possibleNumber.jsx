import React, { Component } from "react";
import * as d3 from "d3";

class PossibleNumber extends Component {
  possibility = React.createRef();
  target = null;
  past = null;
  poss = null;
  state = {};

  componentDidMount() {
    this.target = d3.select(this.possibility.current);
  }

  componentDidUpdate() {
    const { possibility } = this.props;
    if (this.past === null) {
      this.past = possibility;
      this.poss = possibility;
    } else {
      this.past = this.poss;
      this.poss = possibility;
    }
    this.renderPossibility();
  }

  renderPossibility() {
    const target = this.target;
    const past = this.past;
    const { possibility } = this.props;
    const interpolate = d3.interpolateRound(past, possibility);
    target
      .transition()
      .duration(1000)
      .tween("possibilityChanging", () => t => target.text(interpolate(t)));
  }

  render() {
    const { label, color, gradient } = this.props;
    return (
      <React.Fragment>
        <rect
          x="0"
          y="0"
          rx="10"
          width="250"
          height="60"
          fill={`url(#${gradient})`}
        />
        <text
          x="20"
          y="48"
          fontSize="18"
          fontStyle="italic"
          fill="#181942"
          textAnchor="start"
        >
          {label}
        </text>
        <text
          x="200"
          y="48"
          fontSize="48"
          fill={color}
          textAnchor="end"
          ref={this.possibility}
        >
          --
        </text>
        <text x="230" y="48" fontSize="18" fill={color} textAnchor="end">
          %
        </text>
      </React.Fragment>
    );
  }
}

export default PossibleNumber;
