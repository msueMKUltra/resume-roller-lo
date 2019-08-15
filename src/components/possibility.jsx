import React, { Component } from "react";
import Content from "./content";
import DataVisualization from "./dataVisualization";
import { setCurrentTarget } from "../uitilities/mouseWheel";

class Possibility extends Component {
  ref = React.createRef();
  data = {
    title: "Possibility",
    fontColor: "#c1ebe2",
    circleColor: "#1b536e",
    contents: [
      {
        subtitle: "sort-numeric-up-alt",
        text: (
          <React.Fragment>
            <p className="m-0">Number interpolating</p>
            <p>with animation.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "chart-line",
        text: (
          <React.Fragment>
            <p className="m-0">Path changing in</p>
            <p>real time.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "tags",
        text: (
          <React.Fragment>
            <p>Axis and labels display.</p>
          </React.Fragment>
        )
      }
    ]
  };
  state = {};

  componentDidMount() {
    setCurrentTarget(this.props, this.ref.current);
  }

  render() {
    return (
      <div className="roller-possibility w-100 px-4 px-sm-0" ref={this.ref}>
        <div className="row">
          <div className="col-12 col-lg-5 mt-5">
            <Content data={this.data} />
          </div>
          <div className="col-12 col-lg-6 mt-5 mb-5 mb-lg-0">
            <DataVisualization page="possibility" />
          </div>
        </div>
      </div>
    );
  }
}

export default Possibility;
