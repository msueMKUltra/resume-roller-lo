import React, { Component } from "react";

class Canvas extends Component {
  ref = React.createRef();
  state = {};
  paths = [];

  componentDidMount() {
    this.renderCanvas();
  }

  componentDidUpdate() {
    this.rerenderCanvas();
  }

  getEventPosition(ev) {
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
      x = ev.offsetX;
      y = ev.offsetY;
    }
    return { x: x, y: y };
  }

  renderCanvas() {
    const { taggingList: lists, selectedIndex, handleSelect } = this.props;
    const cvs = this.ref.current;
    cvs.width = 500;
    cvs.height = 500;
    const ctx = cvs.getContext("2d");

    lists.forEach((item, i) => {
      if (selectedIndex === i) return;
      // item.ctx = ctx;
      // ctx.beginPath();
      // ctx.strokeStyle = item.color;
      // item.points.forEach((point, index) => {
      //   if (index) ctx.lineTo(point.x, point.y);
      //   else ctx.moveTo(point.x, point.y);
      // });
      // ctx.closePath();
      // ctx.stroke();
      let path = new Path2D();
      item.points.forEach((point, index) => {
        if (index) path.lineTo(point.x, point.y);
        else path.moveTo(point.x, point.y);
      });
      path.closePath();
      ctx.strokeStyle = item.color;
      ctx.stroke(path);
      this.paths.push(path);
    });
    const that = this;
    cvs.addEventListener(
      "click",
      function(e) {
        const p = that.getEventPosition(e);
        // console.log(p.x);
        // console.log(p.y);
        // lists.forEach(d => {
        //   if (d.ctx.isPointInPath(p.x, p.y)) {
        //     console.log(p.x);
        //     console.log(p.y);
        //   }
        // });
        that.paths.forEach((path, index) => {
          if (ctx.isPointInPath(path, p.x, p.y)) {
            console.log("click", index);
            // that.selectedIndex = index;
            handleSelect(index);
          }
        });
      },
      false
    );
  }

  rerenderCanvas() {
    const { taggingList: lists, selectedIndex } = this.props;
    const cvs = this.ref.current;
    const ctx = cvs.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    this.paths.length = 0;
    lists.forEach((item, i) => {
      console.log("rerender", i);
      let path = new Path2D();
      item.points.forEach((point, index) => {
        if (index) path.lineTo(point.x, point.y);
        else path.moveTo(point.x, point.y);
      });
      path.closePath();
      ctx.strokeStyle = item.color;
      if (selectedIndex !== i) ctx.stroke(path);
      this.paths.push(path);
    });
  }

  render() {
    const { isEditing } = this.props;
    return (
      <div
        className={`roller-canvas ${isEditing ? "roller-down" : "roller-up"}`}
        style={{ width: "500px", height: "500px" }}
      >
        <canvas ref={this.ref}></canvas>
      </div>
    );
  }
}

export default Canvas;