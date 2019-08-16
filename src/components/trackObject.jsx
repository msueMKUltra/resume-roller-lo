import React, { Component } from "react";
import * as d3 from "d3";
import { getMouseCoordinate } from "../uitilities/mouseOver";

class RandomObject extends Component {
  playground = React.createRef();
  group = null;
  state = {
    past: {
      x: null,
      y: null
    },
    coordinate: {
      x: null,
      y: null
    }
  };

  componentDidMount() {
    this.group = d3.select(this.playground.current).text("");
    this.setCoordinates();
  }

  componentDidUpdate() {
    this.renderCircle();
  }

  componentWillUnmount() {
    this.group
      .selectAll(".circle")
      .transition()
      .on("start", null)
      .on("end", null);
  }

  setCoordinates = () => {
    if (this.props.isInteractive) return this.setMouseCoordinate();
    this.setRandomCoordinate();
  };

  setMouseCoordinate = () => {
    const { coordinate, past } = { ...this.state };
    const mouse = getMouseCoordinate();
    if (mouse) {
      if (coordinate.x && coordinate.y) {
        past.x = coordinate.x;
        past.y = coordinate.y;
        coordinate.x = mouse.x;
        coordinate.y = mouse.y;
      } else {
        coordinate.x = past.x = mouse.x;
        coordinate.y = past.y = mouse.y;
      }
      return this.setState({ coordinate, past });
    }
    this.setRandomCoordinate();
  };

  setRandomCoordinate = () => {
    const { scaleW, scaleH } = this.props;
    const { coordinate, past } = { ...this.state };
    const xMin = scaleW.domain()[0] + 1;
    const xMax = scaleW.domain()[1] - 1;
    const yMin = scaleH.domain()[0] + 1;
    const yMax = scaleH.domain()[1] - 1;
    let newX = 0;
    let newY = 0;

    if (coordinate.x && coordinate.y) {
      const xDiff = ~~(Math.random() * 11) - 5;
      const yDiff = ~~(Math.random() * 11) - 5;
      newX = coordinate.x + xDiff;
      newY = coordinate.y + yDiff;
      past.x = coordinate.x;
      past.y = coordinate.y;
      coordinate.x = newX < xMin ? xMin : newX > xMax ? xMax : newX;
      coordinate.y = newY < yMin ? yMin : newY > yMax ? yMax : newY;
    } else {
      newX = ~~(Math.random() * xMax) + 1;
      newY = ~~(Math.random() * yMax) + 1;
      coordinate.x = past.x = newX < xMin ? xMin : newX > xMax ? xMax : newX;
      coordinate.y = past.y = newY < yMin ? yMin : newY > yMax ? yMax : newY;
    }

    this.setState({ coordinate, past });
  };

  renderCircle() {
    const { coordinate, past } = { ...this.state };
    const { scaleW, scaleH, color } = this.props;
    const group = this.group;
    const that = this;

    const update = this.group.selectAll(".circle").data([coordinate]);
    const enter = update
      .enter()
      .append("circle")
      .attr("class", "circle");
    const exit = update.exit();

    update
      .transition()
      .ease(d3.easeLinear)
      .duration(1400)
      .attr("opacity", 1)
      .attr("r", 10)
      .attr("cx", d => scaleW(d.x))
      .attr("cy", d => scaleH(d.y))
      .on("start", function(d) {
        const mid = that.caculateMiddlePoint(d.x, d.y, past.x, past.y);
        group
          .select(".circle-shadow")
          .attr("r", 0)
          .attr("opacity", 1)
          .attr("fill", color)
          .transition()
          .ease(d3.easeLinear)
          .duration(700)
          .attr("cx", scaleW(mid.x))
          .attr("cy", scaleH(mid.y))
          .attr("r", 24)
          .attr("opacity", 0.2)
          .transition()
          .ease(d3.easeLinear)
          .duration(700)
          .attr("cx", scaleW(d.x))
          .attr("cy", scaleH(d.y))
          .attr("r", 40)
          .attr("opacity", 0);
        group
          .append("circle")
          .attr("r", 0)
          .attr("cx", scaleW(mid.x))
          .attr("cy", scaleH(mid.y))
          .attr("fill", color)
          .transition()
          .ease(d3.easeLinear)
          .duration(0)
          .delay(700)
          .attr("r", 6)
          .attr("opacity", 1)
          .transition()
          .duration(10000)
          .delay(0)
          .attr("r", 0)
          .attr("opacity", 0)
          .on("end", function() {
            d3.select(this).remove();
          });
        group
          .append("circle")
          .attr("r", 0)
          .attr("cx", scaleW(d.x))
          .attr("cy", scaleH(d.y))
          .attr("fill", color)
          .transition()
          .ease(d3.easeLinear)
          .duration(0)
          .delay(1400)
          .attr("r", 6)
          .attr("opacity", 1)
          .transition()
          .duration(10000)
          .delay(0)
          .attr("r", 0)
          .attr("opacity", 0)
          .on("end", function() {
            d3.select(this).remove();
          });
      })
      .on("end", this.setCoordinates);

    enter
      .attr("cx", d => scaleW(d.x))
      .attr("cy", d => scaleH(d.y))
      .attr("r", 10)
      .attr("opacity", 0)
      .attr("fill", color)
      .transition()
      .duration(1400)
      .attr("opacity", 1)
      .on("start", function(d) {
        group
          .append("circle")
          .attr("class", "circle-shadow")
          .attr("r", 0)
          .attr("opacity", 1)
          .attr("fill", color)
          .attr("cx", scaleW(d.x))
          .attr("cy", scaleH(d.y))
          .transition()
          .ease(d3.easeLinear)
          .duration(700)
          .attr("r", 24)
          .attr("opacity", 0.2)
          .transition()
          .ease(d3.easeLinear)
          .duration(700)
          .attr("r", 40)
          .attr("opacity", 0);
        group
          .append("circle")
          .attr("r", 0)
          .attr("cx", scaleW(d.x))
          .attr("cy", scaleH(d.y))
          .attr("fill", color)
          .transition()
          .ease(d3.easeLinear)
          .duration(0)
          .delay(1400)
          .attr("r", 6)
          .attr("opacity", 1)
          .transition()
          .duration(10000)
          .delay(0)
          .attr("r", 0)
          .attr("opacity", 0)
          .on("end", function() {
            d3.select(this).remove();
          });
      })
      .on("end", this.setCoordinates);

    exit.remove();
  }

  caculateMiddlePoint(x1, y1, x2, y2) {
    return { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
  }

  render() {
    return <g ref={this.playground} />;
  }
}

export default RandomObject;
