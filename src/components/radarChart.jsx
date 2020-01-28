import React, { Component } from "react";
import d3js from "../images/d3js.png";
import mongodb from "../images/mongodb.png";
import ps from "../images/photoshop.png";
import ai from "../images/illustrator.png";
import xd from "../images/experience.png";
import bs from "../images/bootstrap.png";
import docker from "../images/docker.png";
import nodejs from "../images/nodejs.png";
import react from "../images/react.png";
import * as d3 from "d3";

class RadarChart extends Component {
  radar = React.createRef();
  image = React.createRef();
  group = null;
  images = null;
  labels = [
    "Photoshop",
    "Illustrator",
    "Experience",
    "React",
    "D3.js",
    "Bootstrap",
    "Node.js",
    "MongoDB",
    "Docker"
  ];
  skill = {
    highestScore: 5,
    scores: [3, 2, 3, 3, 4, 4, 3, 2, 1],
    locations: [],
    layers: []
  };
  scale = d3
    .scaleLinear()
    .domain([0, 1, 5])
    .range([0, 50, 170]);
  area = d3
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveLinearClosed);
  state = {};

  componentDidMount() {
    const { highestScore, scores, locations, layers } = this.skill;
    this.group = d3.select(this.radar.current);
    this.images = d3.select(this.image.current);
    for (let i = 0; i <= highestScore; i++) {
      const limits = scores.map(d => (d < i ? d : i));
      locations.push(this.transformPointsData(limits));
      layers.push(this.transformPointsData(scores.map(() => i)));
    }
    layers[0] = this.transformPointsData(layers[0].map(() => 6.5));

    this.renderLayers();
    this.renderLines();
    this.renderImages();
    this.renderRadar();
    this.renderCircles();
  }

  transformPointsData(scores) {
    const scale = this.scale;
    const numberOfItems = scores.length;
    const angle = 360 / numberOfItems;
    return scores.map((d, i) => {
      const degree = angle * i;
      const theta = degree > 0 ? Math.PI / (180 / (degree % 90)) : 0;
      const sin = Math.sin(theta);
      const cos = Math.cos(theta);
      let x = 0;
      let y = 0;
      if (degree === 0) {
        // (0, -170)
        x = 0;
        y = -scale(d);
      } else if (degree < 90) {
        // (170sinƟ, -170cosƟ)
        x = scale(d) * sin;
        y = -(scale(d) * cos);
      } else if (degree === 90) {
        // (170, 0)
        x = scale(d);
        y = 0;
      } else if (degree < 180) {
        // (170cosƟ, 170sinƟ)
        x = scale(d) * cos;
        y = scale(d) * sin;
      } else if (degree === 180) {
        // (0, 170)
        x = 0;
        y = scale(d);
      } else if (degree < 270) {
        // (-170sinƟ, 170cosƟ)
        x = -(scale(d) * sin);
        y = scale(d) * cos;
      } else if (degree === 270) {
        // (-170, 0)
        x = -scale(d);
        y = 0;
      } else if (degree < 360) {
        // (-170cosƟ, -170sinƟ)
        x = -(scale(d) * cos);
        y = -(scale(d) * sin);
      }
      return { x: x, y: y };
    });
  }

  renderLayers() {
    const { layers } = this.skill;
    for (let i = 5; i > 0; i--) {
      const color = i % 2 ? "#2d7296" : "#4483a4";
      this.group
        .append("path")
        .datum(layers[i])
        .attr("d", this.area)
        .attr("fill", color);
    }
  }

  renderLines() {
    const numberOfItems = this.skill.scores.length;
    const angle = 360 / numberOfItems;
    for (let i = 0; i < numberOfItems; i++) {
      this.group
        .append("line")
        .attr("stroke", "#81aec6")
        .attr("stroke-width", 0.5)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 170)
        .attr("y2", 0)
        .attr("transform", `rotate(${angle * i - 90})`);
    }
  }

  renderImages() {
    const { layers } = this.skill;
    const images = this.images;
    images
      .selectAll("image")
      .data(layers[0])
      .attr("x", d => d.x - 20)
      .attr("y", d => d.y - 24)
      .attr("opacity", 1);
    layers[0].map((d, i) => {
      return images
        .append("text")
        .attr("x", d.x)
        .attr("y", d.y + 32)
        .attr("font-size", 12)
        .attr("fill", "#181942")
        .attr("text-anchor", "middle")
        .text(this.labels[i]);
    });
  }

  renderRadar() {
    const { locations } = this.skill;
    const path = this.group
      .append("g")
      .append("path")
      .datum(locations[0])
      .attr("d", this.area)
      .attr("fill", "#181942")
      .attr("fill-opacity", 0.4)
      .attr("stroke", "#81f2d9")
      .attr("stroke-width", 3);

    this.transitionArea(path, 1);
  }

  renderCircles() {
    const { locations, highestScore } = this.skill;
    this.group
      .selectAll(".circle")
      .data(locations[highestScore])
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("fill", "#fff")
      .attr("stroke", "#81f2d9")
      .attr("stroke-width", 1)
      .attr("r", 10)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("opacity", 0);
  }

  transitionArea(path, loop) {
    if (loop > 4) {
      return d3
        .selectAll(".circle")
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("opacity", 1)
        .attr("r", 4);
    }
    const area = this.area;
    const { locations } = this.skill;
    const that = this;
    path
      .datum(locations[loop])
      .transition()
      .ease(d3.easeLinear)
      .delay(() => (loop === 1 ? 400 : 0))
      .duration(400)
      .attr("d", area)
      .on("end", () => {
        that.transitionArea(path, loop + 1);
      });
  }

  render() {
    const { width, height } = this.props;
    return (
      <React.Fragment>
        <defs>
          <filter id="roller-blur" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="10" in="SourceGraphic" />
          </filter>
        </defs>
        <circle
          filter="url(#roller-blur)"
          r="170"
          cx={width / 2}
          cy={height / 2}
          fill="#2d7296"
        />
        <g
          ref={this.image}
          transform={`translate(${width / 2}, ${height / 2})`}
        >
          <image xlinkHref={ps} width="40" height="40" opacity="0" />
          <image xlinkHref={ai} width="40" height="40" opacity="0" />
          <image xlinkHref={xd} width="40" height="40" opacity="0" />
          <image xlinkHref={react} width="40" height="40" opacity="0" />
          <image xlinkHref={d3js} width="40" height="40" opacity="0" />
          <image xlinkHref={bs} width="40" height="40" opacity="0" />
          <image xlinkHref={nodejs} width="40" height="40" opacity="0" />
          <image xlinkHref={mongodb} width="40" height="40" opacity="0" />
          <image xlinkHref={docker} width="40" height="40" opacity="0" />
        </g>
        <g
          ref={this.radar}
          transform={`translate(${width / 2}, ${height / 2})`}
        />
      </React.Fragment>
    );
  }
}

export default RadarChart;
