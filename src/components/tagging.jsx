import React, { Component } from "react";
import { setCurrentTarget } from "../uitilities/mouseWheel";
import Svg from "./svg";
import Canvas from "./canvas";
import {
  getCirclesLocation,
  setCirclesData,
  getCirclesData
} from "../uitilities/handleCircles";

class Tagging extends Component {
  ref = React.createRef();
  state = {
    isEditing: false,
    selectedIndex: null,
    startPoint: null,
    circles: [],
    taggingList: [
      {
        id: 1,
        name: "tag1",
        color: "mistyrose",
        isSelected: false,
        points: [
          { x: 120, y: 220 },
          { x: 130, y: 230 },
          { x: 140, y: 260 },
          { x: 120, y: 290 },
          { x: 110, y: 240 }
        ]
      },
      {
        id: 2,
        name: "tag2",
        color: "khaki",
        isSelected: false,
        points: [
          { x: 250, y: 220 },
          { x: 300, y: 280 },
          { x: 280, y: 290 },
          { x: 260, y: 270 },
          { x: 210, y: 240 }
        ]
      }
    ]
  };

  componentDidMount() {
    setCurrentTarget(this.props, this.ref.current);
  }

  handleSelect = (index, type) => {
    switch (type) {
      case "focus":
        const taggingList = this.state.taggingList.map((d, i) => {
          if (i === index) {
            d.isSelected = true;
          }
          return d;
        });
        console.log(index);
        this.setState({ taggingList });
        break;
    }
    // const isEditing = index === null ? false : true;
    // this.setState({ selectedIndex: index, isEditing });
    // if (index !== null) return;
    // const { targetIndex, locations } = getCirclesLocation();
    // const taggingList = [...this.state.taggingList];
    // if (targetIndex === null) return;
    // taggingList[targetIndex].points = locations;
    // this.setState({ taggingList });
  };

  cleanStartPoint = () => {
    this.setState({ startPoint: null });
  };

  handleAdding = startPoint => {
    console.log("adding", startPoint);
    this.setState({ startPoint });
  };

  render() {
    const { taggingList, selectedIndex, isEditing, startPoint } = this.state;
    setCirclesData(selectedIndex, taggingList);
    const circles = getCirclesData();
    return (
      <div className="roller-tagging w-100 px-4 px-sm-0" ref={this.ref}>
        <div className="row">
          <div className="col">
            <p>
              {selectedIndex !== null ? taggingList[selectedIndex].name : "--"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col roller-tagging-container">
            {/* <Svg
              circles={circles}
              taggingList={taggingList}
              selectedIndex={selectedIndex}
              handleSelect={this.handleSelect}
              isEditing={isEditing}
              startPoint={startPoint}
              cleanStartPoint={this.cleanStartPoint}
            ></Svg> */}
            <Canvas
              taggingList={taggingList}
              selectedIndex={selectedIndex}
              handleSelect={this.handleSelect}
              handleAdding={this.handleAdding}
              isEditing={isEditing}
            ></Canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default Tagging;
