import React, { Component } from "react";
import TrackObject from "./trackObject";
import * as d3 from "d3";
import {
  setMouseCoordinate,
  cleanMouseCoordinate
} from "../uitilities/mouseOver";

class CoordinateChart extends Component {
  coordinate = React.createRef();
  interface = React.createRef();
  group = null;
  rect = {
    width: 400,
    height: 480
  };
  scaleW = d3
    .scaleLinear()
    .domain([0, 40])
    .range([0, 400]);
  scaleH = d3
    .scaleLinear()
    .domain([0, 48])
    .range([0, 480]);
  state = {};

  componentDidMount() {
    this.group = d3.select(this.coordinate.current);

    this.renderGrids();
  }

  renderGrids() {
    const { width: rw, height: rh } = this.rect;
    const scaleW = this.scaleW;
    const scaleH = this.scaleH;

    const axisB = d3
      .axisBottom(scaleW)
      .tickValues(d3.range(0, 40, 8))
      .tickSize(rh)
      .tickFormat(() => null);
    const ticksB = this.group
      .append("g")
      .attr("transform", `translate(${scaleW(4)}, 0)`)
      .call(axisB);
    ticksB.selectAll(".domain").remove();
    ticksB
      .selectAll(".tick line")
      .attr("stroke", "#4e89ab")
      .attr("stroke-width", 6);

    const axisR = d3
      .axisRight(scaleH)
      .tickValues(d3.range(0, 48, 8))
      .tickSize(rw)
      .tickFormat(() => null);
    const ticksR = this.group
      .append("g")
      .attr("transform", `translate(0, ${scaleH(4)})`)
      .call(axisR);
    ticksR.selectAll(".domain").remove();
    ticksR
      .selectAll(".tick line")
      .attr("stroke", "#4e89ab")
      .attr("stroke-width", 6);
  }

  handleMouseOver = () => {
    const scaleW = this.scaleW;
    const scaleH = this.scaleH;
    d3.select(this.interface.current).on("mousemove", function() {
      const mouse = d3.mouse(this);
      setMouseCoordinate(scaleW.invert(mouse[0]), scaleH.invert(mouse[1]));
    });
  };

  handleMouseOut = () => {
    cleanMouseCoordinate();
  };

  render() {
    const { width, height } = this.props;
    const { width: rw, height: rh } = this.rect;
    return (
      <React.Fragment>
        <defs>
          <filter id="roller-shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#181942" />
          </filter>
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
          <g ref={this.coordinate} />
          <TrackObject
            scaleW={this.scaleW}
            scaleH={this.scaleH}
            color="#81f2d9"
          />
          <TrackObject
            scaleW={this.scaleW}
            scaleH={this.scaleH}
            color="#dcd5fa"
            isInteractive={true}
          />
          <rect
            ref={this.interface}
            width={rw}
            height={rh}
            x="0"
            y="0"
            rx="10"
            opacity="0"
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          />
        </g>
      </React.Fragment>
    );
  }
}

export default CoordinateChart;
