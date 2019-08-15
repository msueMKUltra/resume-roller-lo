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
        subtitle: 2.6,
        isWord: true,
        text: (
          <React.Fragment>
            <p className="m-0">
              <strong>Years</strong> of experience
            </p>
            <p> for Front-end development.</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "briefcase",
        text: (
          <React.Fragment>
            <p className="font-weight-bolder m-0">2017 - 2019</p>
            <p className="m-0 pl-4">GOOEE</p>
            <p className="font-italic pl-4">Front-end Developer</p>
            <p className="font-weight-bolder m-0">2016 - 2017</p>
            <p className="m-0 pl-4">Blue Well</p>
            <p className="font-italic pl-4">PHP Front-end Developer</p>
          </React.Fragment>
        )
      },
      {
        subtitle: "graduation-cap",
        text: (
          <React.Fragment>
            <p className="font-weight-bolder m-0">2012 - 2015</p>
            <p className="m-0 pl-4">National Chung Cheng University</p>
            <p className="font-italic pl-4">Master of Computer Science</p>
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
