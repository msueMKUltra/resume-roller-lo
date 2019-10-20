import React, { Component } from "react";
import Circles from "./circles";
import { setCirclesLocation } from "../uitilities/handleCircles";

class Svg extends Component {
  ref = React.createRef();
  state = {
    circles: []
  };

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { selectedIndex, handleSelect, circles, isEditing } = this.props;
    console.log(circles);
    return (
      <div
        className={`roller-svg ${isEditing ? "roller-up" : "roller-down"}`}
        onDoubleClick={() => {
          setCirclesLocation(selectedIndex);
          handleSelect(null);
        }}
      >
        <svg ref={this.ref} width="500" height="500">
          {
            <React.Fragment>
              <Circles></Circles>
            </React.Fragment>
          }
          )}
        </svg>
      </div>
    );
  }
}

export default Svg;
