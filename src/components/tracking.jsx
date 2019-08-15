import React, { Component } from "react";
import Content from "./content";
import DataVisualization from "./dataVisualization";
import { setCurrentTarget } from "../uitilities/mouseWheel";

class Tracking extends Component {
  ref = React.createRef();
  data = {
    title: "Tracking",
    fontColor: "#c1ddeb",
    circleColor: "#355891",
    contents: [
      {
        subtitle: "walking",
        text: (
          <React.Fragment>
            <p className="m-0">Objects detection with</p>
            <p>multiple locations.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "border-all",
        text: (
          <React.Fragment>
            <p className="m-0">Grids distribution by</p>
            <p>axis adjustment.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "mouse-pointer",
        text: (
          <React.Fragment>
            <p>Interaction of mouse cursor.</p>
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
      <div className="roller-tracking w-100 px-4 px-sm-0" ref={this.ref}>
        <div className="row">
          <div className="col-12 col-lg-5 mt-5 roller-push-lg-7">
            <Content data={this.data} />
          </div>
          <div className="col-12 col-lg-6 mt-5 mb-5 mb-lg-0 roller-pull-lg-5">
            <DataVisualization page="tracking" />
          </div>
        </div>
      </div>
    );
  }
}

export default Tracking;
