import React, { Component } from "react";
import * as d3 from "d3";

class Line extends Component {
  ref = React.createRef();
  state = {};
  path = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveLinearClosed);

  componentDidMount() {
    this.renderSvg();
  }

  componentDidUpdate() {
    this.renderSvg();
  }

  renderSvg() {
    const { circles } = this.props;
    console.log(circles);

    const path = this.path;

    const update = d3
      .select(this.ref.current)
      .selectAll(".path")
      .data([circles]);
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

  render() {
    return <g ref={this.ref} />;
  }
}

export default Line;
