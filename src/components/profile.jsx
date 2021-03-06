import React, { Component } from "react";
import Content from "./content";
import DataVisualization from "./dataVisualization";
import { setCurrentTarget } from "../uitilities/mouseWheel";

class Profile extends Component {
  ref = React.createRef();
  data = {
    title: "Roller Lo",
    fontColor: "#c1ebe2",
    circleColor: "#1b536e",
    contents: [
      {
        subtitle: "clock",
        isWord: false,
        text: (
          <React.Fragment>
            <p className="m-0">
              <span className="font-weight-bolder font-italic">
                {this.getWorkingYears()}
              </span>
              <span> years of experience</span>
            </p>
            <p> for Front-end development.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "briefcase",
        text: (
          <React.Fragment>
            <p className="m-0">
              <span className="font-weight-bolder font-italic ">
                2019 - now
              </span>
              <span className="pl-2">FLOW</span>
            </p>
            <p className="pl-4">Senior Front-end Developer</p>
            <p className="m-0">
              <span className="font-weight-bolder font-italic ">
                2017 - 2019
              </span>
              <span className="pl-2">GOOEE</span>
            </p>
            <p className="pl-4">Front-end Developer</p>
            <p className="m-0">
              <span className="font-weight-bolder font-italic ">
                2016 - 2017
              </span>
              <span className="pl-2">BLUE WELL</span>
            </p>
            <p className="pl-4">PHP Front-end Developer</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "graduation-cap",
        text: (
          <React.Fragment>
            <p className="m-0">
              <span className="font-weight-bolder font-italic">
                2012 - 2015
              </span>
              <span className="pl-2">CCU</span>
            </p>
            <p className="pl-4">Master of Computer Science</p>
          </React.Fragment>
        )
      }
    ]
  };
  state = {};

  componentDidMount() {
    setCurrentTarget(this.props, this.ref.current);
  }

  getWorkingYears() {
    const now = new Date().getTime();
    const then = new Date(2016, 10, 26).getTime();
    return ((now - then) / 1000 / 60 / 60 / 24 / 365).toFixed(1);
  }

  render() {
    return (
      <div className="roller-profile w-100 px-4 px-sm-0" ref={this.ref}>
        <div className="row">
          <div className="col-12 col-lg-5 mt-5">
            <Content data={this.data} />
          </div>
          <div className="col-12 col-lg-6 mt-5 mb-5 mb-lg-0">
            <DataVisualization page="profile" />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
