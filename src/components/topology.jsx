import React, { Component } from "react";
import Content from "./content";
import DataVisualization from "./dataVisualization";
import { setCurrentTarget } from "../uitilities/mouseWheel";

class Topology extends Component {
  ref = React.createRef();
  data = {
    title: "Topology",
    fontColor: "#c1ddeb",
    circleColor: "#355891",
    contents: [
      {
        subtitle: "bezier-curve",
        text: (
          <React.Fragment>
            <p className="m-0">Showing labels at</p>
            <p>Force-directed graph.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "glass-cheers",
        text: (
          <React.Fragment>
            <p className="m-0">Connecting relationship</p>
            <p>between parents and children.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "hand-paper",
        text: (
          <React.Fragment>
            <p className="m-0">
              <b>Dragging</b>
              <span> the target node</span>
            </p>
            <p>while changing location.</p>
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
      <div className="roller-topology w-100 px-4 px-sm-0" ref={this.ref}>
        <div className="row">
          <div className="col-12 col-lg-5 mt-5 roller-push-lg-7">
            <Content data={this.data} />
          </div>
          <div className="col-12 col-lg-6 mt-5 mb-5 mb-lg-0 roller-pull-lg-5">
            <DataVisualization page="topology" />
          </div>
        </div>
      </div>
    );
  }
}

export default Topology;
