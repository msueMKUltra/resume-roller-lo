import React, { Component } from "react";
import * as d3 from "d3";

class Editing extends Component {
  ref = React.createRef();
  state = {};
  nodes = [];
  edges = [];
  rect = {
    width: 300,
    height: 150
  };

  componentDidMount() {
    const { item } = this.props;
    const { width, height } = this.rect;
    this.nodes = item.points.map((d, i) => {
      return {
        name: i
      };
    });
    this.edges = item.points.map((d, i) => {
      let target = i + 1;
      if (i + 1 === item.points.length) target = 0;
      return { source: i, target: target };
    });

    const group = d3.select(this.ref.current);

    const charge = d3.forceManyBody().strength(0);
    const center = d3.forceCenter(width / 2, height / 2);
    const link = d3.forceLink(this.edges).distance(80);

    this.simulation = d3
      .forceSimulation(this.nodes)
      .force("charge", charge)
      .force("center", center)
      .force("links", link)
      .alphaTarget(0.3)
      .on("tick", this.ticked);

    this.lines = group
      .selectAll(".forceLine")
      .data(this.edges)
      .enter()
      .append("line")
      .classed("forceLine", true)
      .attr("stroke", "#81f2d9")
      .attr("stroke-width", 4)
      .attr("pointer-events", "none");

    this.circles = group
      .selectAll(".forceCircle")
      .data(this.nodes)
      .enter()
      .append("circle")
      .attr("class", "forceCircle")
      .attr("fill", "#81f2d9")
      .attr("r", 18)
      .attr("cursor", "grab");

    const drag = d3
      .drag()
      .on("start", this.dragStarted)
      .on("drag", this.dragged)
      .on("end", this.dragEnded);

    this.circles
      .call(drag)
      .on("mouseover", () => (this.isLabelVisable = true))
      .on("mouseout", () => (this.isLabelVisable = false))
      .filter((d, i) => i === 0)
      .attr("fill", "#dcd5fa")
      .each(d => {
        d.fx = width / 2;
        d.fy = height / 2;
      });
  }

  ticked = () => {
    this.lines
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
    this.simulation.alphaTarget(0);
  };

  dragStarted = d => {
    // d3.event 為當前觸發的事件，active => 0為尚未執行，1為執行中
    this.circles.each(d => {
      d.fx = null; // 用來移動時，將每個點預設為原本會動狀態
      d.fy = null; // 用來移動時，將每個點預設為原本會動狀態
    });

    d.fx = d.x; // 開始時，設定移動點的位置為當前位置
    d.fy = d.y; // 開始時，設定移動點的位置為當前位置
  };

  dragged = d => {
    const { width, height } = this.rect;
    const diff = 20;
    const x = d3.event.x;
    const y = d3.event.y;
    d.fx = x < diff ? diff : x > width - diff ? width - diff : x; // 拖曳時，設定移動點的位置為滑鼠的位置
    d.fy = y < diff ? diff : y > height - diff ? height - diff : y; // 拖曳時，設定移動點的位置為滑鼠的位置
  };

  dragEnded = () => {
    // if (!d3.event.active) this.simulation.alphaTarget(0);
    // d.fx = null; // 結束時，設為null，則會恢復成預設狀態
    // d.fy = null; // 結束時，設為null，則會恢復成預設狀態
  };

  render() {
    return <g ref={this.ref}></g>;
  }
}

export default Editing;
