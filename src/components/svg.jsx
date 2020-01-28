import React, { Component } from "react";
import Circles from "./circles";
import Circles2 from "./circles2";
import { setCirclesLocation } from "../uitilities/handleCircles";

class Svg extends Component {
  ref = React.createRef();
  state = {
    circles: []
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const {
      selectedIndex,
      handleSelect,
      circles,
      isEditing,
      startPoint,
      cleanStartPoint
    } = this.props;
    console.log(circles);
    return (
      <div
        className={`roller-svg ${isEditing ? "roller-up" : "roller-down"}`}
        onDoubleClick={() => {
          setCirclesLocation(selectedIndex);
          handleSelect(null);
          if (startPoint) cleanStartPoint();
        }}
      >
        <svg ref={this.ref} width="500" height="500">
          {
            <React.Fragment>
              {startPoint === null ? (
                <Circles />
              ) : (
                <Circles2 startPoint={startPoint} />
              )}
            </React.Fragment>
          }
          )}
        </svg>
      </div>
    );
  }
}

export default Svg;
