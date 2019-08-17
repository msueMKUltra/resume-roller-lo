import React, { Component } from "react";
import * as d3 from "d3";

// https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868

class ForceDirectedGraph extends Component {
  target = React.createRef();
  rect = {
    width: 400,
    height: 480
  };
  group = null;
  lines = null;
  circles = null;
  simulation = null;
  nodes = [
    { name: "node1" },
    { name: "node2" },
    { name: "node3" },
    { name: "node4" },
    { name: "node5" },
    { name: "node6" },
    { name: "node7" },
    { name: "node8" }
  ];
  edges = [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 4, target: 6 },
    { source: 4, target: 7 }
  ];
  state = {};

  componentDidMount() {
    this.group = d3.select(this.target.current);
    this.renderForce();
  }

  renderForce() {
    const group = this.group;
    const { width, height } = this.rect;
    const charge = d3.forceManyBody().strength(-100);
    const center = d3.forceCenter(width / 2, height / 2);
    const link = d3.forceLink(this.edges).distance(80);

    this.simulation = d3
      .forceSimulation(this.nodes)
      .force("charge", charge)
      .force("center", center)
      .force("links", link);

    this.simulation.on("tick", this.ticked);

    this.lines = group
      .selectAll(".forceLine")
      .data(this.edges)
      .enter()
      .append("line")
      .classed("forceLine", true)
      .attr("stroke", "#81f2d9")
      .attr("stroke-width", 4);

    this.circles = group
      .selectAll(".forceCircle")
      .data(this.nodes)
      .enter()
      .append("circle")
      .attr("class", "forceCircle")
      .attr("fill", "#81f2d9")
      .attr("r", 18)
      .attr("cursor", "pointer")
      .attr("filter", "url(#roller-drag-shadow");

    const drag = d3
      .drag()
      .on("start", this.dragStarted)
      .on("drag", this.dragged)
      .on("end", this.dragEnded);

    this.circles
      .call(drag)
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
  };

  dragStarted = d => {
    // console.log(d3.event.active); // 0
    // d3.event 為當前觸發的事件，active => 0為尚未執行，1為執行中
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();

    this.circles.each(d => {
      d.fx = null; // 用來移動時，將每個點預設為原本會動狀態
      d.fy = null; // 用來移動時，將每個點預設為原本會動狀態
    });

    d.fx = d.x; // 開始時，設定移動點的位置為當前位置
    d.fy = d.y; // 開始時，設定移動點的位置為當前位置
  };
  dragged = d => {
    const { width, height } = this.rect;
    // console.log(d3.event.active); // 1
    d.fx =
      d3.event.x < 20 ? 20 : d3.event.x > width - 20 ? width - 20 : d3.event.x; // 拖曳時，設定移動點的位置為滑鼠的位置
    d.fy =
      d3.event.y < 20
        ? 20
        : d3.event.y > height - 20
        ? height - 20
        : d3.event.y; // 拖曳時，設定移動點的位置為滑鼠的位置
  };
  dragEnded = (d, i) => {
    // console.log(d3.event.active); // 0
    if (!d3.event.active) this.simulation.alphaTarget(0);
    // d.fx = null; // 結束時，設為null，則會恢復成預設狀態
    // d.fy = null; // 結束時，設為null，則會恢復成預設狀態
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
          <filter id="roller-drag-shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#181942" />
          </filter>
          <linearGradient
            id="roller-gradient-right-top"
            gradientTransform="rotate(-50)"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#5260a7" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="roller-gradient-left-bottom"
            gradientTransform="rotate(140)"
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#5260a7" stopOpacity="0" />
          </linearGradient>
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
          <rect
            x={rw / 2}
            y="0"
            width={rw / 2}
            height={rh / 2}
            fill="url(#roller-gradient-right-top)"
          />
          <rect
            x="0"
            y={rh / 2}
            width={rw / 2}
            height={rh / 2}
            fill="url(#roller-gradient-left-bottom)"
          />
        </g>
        <g
          ref={this.target}
          transform={`translate(${(width - rw) / 2}, ${(height - rh) / 2})`}
        />
      </React.Fragment>
    );
  }
}

export default ForceDirectedGraph;
