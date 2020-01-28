import React, { Component } from "react";
import * as d3 from "d3";
import {
  getCirclesData,
  setMiddlePoints,
  getMiddlePoints,
  addMiddlePoints,
  cleanMiddlePoints,
  setAdjacentPoints
} from "../uitilities/handleCircles";

class Circle extends Component {
  point = React.createRef();
  line = React.createRef();
  circle = React.createRef();
  state = {
    circles: []
  };
  pointTarget = null;
  lineTarget = null;
  circleTarget = null;
  drag = d3
    .drag()
    .on("start", d => this.dragStarted(d))
    .on("drag", d => this.dragged(d))
    .on("end", d => this.dragEnded(d));
  path = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveLinearClosed);

  componentDidMount() {
    this.pointTarget = d3.select(this.point.current);
    this.lineTarget = d3.select(this.line.current);
    this.circleTarget = d3.select(this.circle.current);
    console.log(this.props.startPoint);
  }

  componentDidUpdate() {
    // this.renderCircles();
    // this.renderLine();
  }

  renderCircles() {
    const circles = getCirclesData();
    const update = this.circleTarget.selectAll(".circle").data(circles);
    const enter = update
      .enter()
      .append("circle")
      .attr("class", "circle");
    const exit = update.exit();

    update
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("opacity", d => (d.isMiddle ? (d.isStarted ? 1 : 0.4) : 1));

    enter
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("opacity", d => (d.isMiddle ? 0.4 : 1))
      .attr("r", "4");

    exit.remove();

    update.call(this.drag);
    enter.call(this.drag);
  }

  renderLine() {
    const circles = getCirclesData();
    const path = this.path;

    const update = this.lineTarget.selectAll(".path").data([circles]);
    const enter = update
      .enter()
      .append("path")
      .attr("class", "path");
    const exit = update.exit();

    update.attr("d", path);

    enter
      .attr("d", path)
      .attr("fill", "transparent")
      .attr("stroke", "black")
      .attr("stroke-width", 3);

    exit.remove();
  }

  renderMiddlePoints() {
    const points = getMiddlePoints();

    const update = this.pointTarget.selectAll(".point").data(points);
    const enter = update
      .enter()
      .append("circle")
      .attr("class", "point");
    const exit = update.exit();

    update.attr("cx", d => d.x).attr("cy", d => d.y);

    enter
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("opacity", 0.4)
      .attr("r", "4");

    exit.remove();
  }

  dragStarted = (d, i) => {
    // d3.event 為當前觸發的事件，active => 0為尚未執行，1為執行中

    // d.fx = d.x; // 開始時，設定移動點的位置為當前位置
    // d.fy = d.y; // 開始時，設定移動點的位置為當前位置
    const x = d3.event.x;
    const y = d3.event.y;
    d.x = x;
    d.y = y;
    d.isStarted = true;
    console.log(this.props.startPoint);

    if (d.isMiddle) setMiddlePoints(d.uuid);
    else setAdjacentPoints(d.uuid);
    this.renderCircles();
    this.renderLine();
    this.renderMiddlePoints();
  };

  dragged = d => {
    const x = d3.event.x;
    const y = d3.event.y;
    d.x = x;
    d.y = y;
    console.log(this.props.startPoint);
    if (d.isMiddle) setMiddlePoints(d.uuid);
    else setAdjacentPoints(d.uuid);
    this.renderCircles();
    this.renderLine();
    this.renderMiddlePoints();
    // const { width, height } = this.rect;
    // const diff = 20;
    // const x = d3.event.x;
    // const y = d3.event.y;
    // d.fx = x < diff ? diff : x > width - diff ? width - diff : x; // 拖曳時，設定移動點的位置為滑鼠的位置
    // d.fy = y < diff ? diff : y > height - diff ? height - diff : y; // 拖曳時，設定移動點的位置為滑鼠的位置
  };

  dragEnded = d => {
    d.isStarted = false;
    if (d.isMiddle) addMiddlePoints(d.uuid);
    d.isMiddle = false;
    cleanMiddlePoints();
    this.renderCircles();
    this.renderLine();
    this.renderMiddlePoints();

    // if (!d3.event.active) this.simulation.alphaTarget(0);
    // d.fx = null; // 結束時，設為null，則會恢復成預設狀態
    // d.fy = null; // 結束時，設為null，則會恢復成預設狀態
  };

  render() {
    return (
      <React.Fragment>
        {/* <Line circles={this.state.circles}></Line> */}
        <g ref={this.point}></g>
        <g ref={this.line}></g>
        <g ref={this.circle}></g>
      </React.Fragment>
    );
  }
}

export default Circle;
