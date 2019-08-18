import React, { Component } from "react";
import {
  getMouseCoordinate,
  setMouseCoordinate,
  cleanMouseCoordinate,
  setTheshold,
  cleanTheshold
} from "../uitilities/mouseOver";
import * as d3 from "d3";

class PossibleLine extends Component {
  axis = React.createRef();
  line = React.createRef();
  area = React.createRef();
  theshold = React.createRef();
  interface = React.createRef();
  group = null;
  mouse = null;
  data = {
    now: null,
    limit: 5,
    before: [],
    after: []
  };
  location = {
    before: [],
    after: []
  };
  path = d3
    .line()
    .x(d => d.x)
    .y(d => d.y);
  state = {};

  scaleW = d3.scaleLinear();
  scaleH = d3.scaleLinear();

  componentDidMount() {
    const { width, height, possibility } = this.props;
    this.group = d3.select(this.line.current).text("");
    this.mouse = d3.select(this.theshold.current).text("");
    this.scaleW
      .domain([0.5, 5.5])
      .range([60, width - 40])
      .clamp(true);
    this.scaleH
      .domain([0, 100])
      .range([height - 44, 30])
      .clamp(true);
    const now = (this.data.now = possibility);
    for (let i = 0; i <= this.data.limit; i++) {
      if (i === 0) {
        this.data.after.push({ x: 1, y: now });
      } else {
        this.data.after.push({ x: i, y: now });
      }
      if (i === this.data.limit) {
        this.data.before.push({ x: i, y: now });
      } else {
        this.data.before.push({ x: i + 1, y: now });
      }
    }

    this.renderAxis();
    this.setPointsData();
  }

  componentDidUpdate() {
    const { possibility } = this.props;
    this.data.now = possibility;
  }

  componentWillUnmount() {
    cleanTheshold();
  }

  setPointsData = () => {
    const { now, limit } = this.data;
    let newBefore = JSON.parse(JSON.stringify(this.data.after));
    newBefore.shift();
    let newAfter = JSON.parse(JSON.stringify(newBefore));
    newAfter.shift();
    newAfter.forEach(d => (d.x -= 1));
    newBefore.push({ ...newBefore[limit - 1] });
    newAfter.unshift({ ...newAfter[0] });
    newAfter.push({ x: limit, y: now });
    this.location.before = newBefore.map(d => ({
      x: this.scaleW(d.x),
      y: this.scaleH(d.y)
    }));
    this.location.after = newAfter.map(d => ({
      x: this.scaleW(d.x),
      y: this.scaleH(d.y)
    }));
    this.data.before = newBefore;
    this.data.after = newAfter;

    this.renderPath();
  };

  renderAxis() {
    const target = d3.select(this.axis.current);
    const scaleW = this.scaleW;
    const scaleH = this.scaleH;
    const width = scaleW.range()[1] - scaleW.range()[0];

    const axisL = d3
      .axisLeft(scaleH)
      .tickValues(d3.range(0, 101, 20))
      .tickSize(width)
      .tickPadding(10)
      .tickFormat(d => d + "%");
    const ticksL = target
      .append("g")
      .attr("transform", `translate(${scaleW.range()[1]}, 0)`)
      .call(axisL);
    ticksL.selectAll(".domain").remove();
    ticksL.selectAll(".text").remove();
    ticksL
      .selectAll(".tick line")
      .attr("stroke", "#181942")
      .attr("stroke-width", 1)
      .filter((d, i) => i > 0)
      .attr("stroke-dasharray", "3, 6");
    ticksL.selectAll(".tick text").attr("font-size", 12);

    target
      .append("text")
      .attr("transform", `translate(${scaleW(1)}, ${scaleH(0) + 22})`)
      .attr("fill", "#181942")
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .text("past");
    target
      .append("text")
      .attr("transform", `translate(${scaleW(5)}, ${scaleH(0) + 22})`)
      .attr("fill", "#181942")
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .text("now");

    d3.select(this.area.current)
      .append("path")
      .datum([
        { x: scaleW(0.5), y: scaleH(0) },
        { x: scaleW(5.5), y: scaleH(0) }
      ])
      .attr("fill", "#dcd5fa")
      .attr("opacity", 0)
      .attr(
        "d",
        d3
          .area()
          .x(d => d.x)
          .y0(scaleH(0))
          .y1(d => d.y)
      );

    this.mouse
      .append("line")
      .attr("x1", scaleW(0.5))
      .attr("y1", 0)
      .attr("x2", scaleW(5.5))
      .attr("y2", 0)
      .attr("stroke", "#dcd5fa")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "10, 2");

    this.mouse
      .append("text")
      .attr("font-size", 14)
      .attr("text-anchor", "start")
      .attr("dominant-baseline", "middle")
      .attr("x", scaleW(5.5) + 4)
      .attr("y", 0)
      .attr("fill", "#dcd5fa");
  }

  renderPath() {
    const group = this.group;
    const path = this.path;
    const { duration, point } = this.props;
    const { before, after } = this.location;

    const update = group.selectAll(".path").data([before]);
    const enter = update
      .enter()
      .append("path")
      .attr("class", "path");
    const exit = update.exit();

    update
      .attr("d", path)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("d", () => path(after))
      .on("end", this.setPointsData);

    enter
      .attr("d", path)
      .attr("fill", "transparent")
      .attr("stroke", "#81f2d9")
      .attr("stroke-width", 3)
      .attr("opacity", 0)
      .attr("marker-start", `url(#${point}`)
      .attr("marker-mid", `url(#${point}`)
      .attr("marker-end", `url(#${point}`)
      .transition()
      .delay(duration / 2)
      .duration(duration / 2)
      .attr("opacity", 1)
      .on("end", this.setPointsData);

    exit.remove();
  }

  handleMouseOver = () => {
    const scaleH = this.scaleH;
    const target = this.mouse;
    const text = target.select("text");
    d3.select(this.interface.current).on("mousemove", function() {
      const mouse = d3.mouse(this);
      const invert = scaleH.invert(mouse[1]);
      setMouseCoordinate(0, invert);
      target.attr("opacity", 1).attr("transform", `translate(0, ${mouse[1]})`);
      text.text(~~invert + "%");
    });
  };

  handleMouseOut = () => {
    cleanMouseCoordinate();
    this.mouse
      .transition()
      .duration(1000)
      .attr("opacity", 0);
  };

  handleClick = () => {
    const scaleW = this.scaleW;
    const scaleH = this.scaleH;
    const percentage = ~~getMouseCoordinate().y;
    setTheshold(percentage);

    d3.select(this.area.current)
      .select("path")
      .datum([
        { x: scaleW(0.5), y: scaleH(percentage) },
        { x: scaleW(5.5), y: scaleH(percentage) }
      ])
      .transition()
      .duration(1000)
      .attr("opacity", 0.2)
      .attr(
        "d",
        d3
          .area()
          .x(d => d.x)
          .y0(scaleH(0))
          .y1(d => d.y)
      );
  };

  render() {
    const { width, height } = this.props;
    return (
      <React.Fragment>
        <rect width={width} height={height} rx="10" fill="#666fb4" />
        <g ref={this.area} />
        <g ref={this.axis} />
        <g ref={this.line} />
        <g ref={this.theshold} opacity="0" />
        <rect
          ref={this.interface}
          width={width}
          height={height}
          rx="10"
          fill="transparent"
          cursor="pointer"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          onClick={this.handleClick}
        />
      </React.Fragment>
    );
  }
}

export default PossibleLine;
