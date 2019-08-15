import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Content extends Component {
  state = {};
  render() {
    const { title, fontColor, circleColor, contents } = this.props.data;
    return (
      <React.Fragment>
        <h1 className="roller-title mb-5">{title}</h1>
        <ul className="nav flex-column">
          {contents.map((content, i) => (
            <li className="nav-item clearfix" key={i}>
              <div
                className="float-left text-center pt-2 roller-subtitle"
                style={{ color: fontColor, background: circleColor }}
              >
                {content.isWord ? (
                  <span>{content.subtitle}</span>
                ) : (
                  <FontAwesomeIcon icon={content.subtitle} fixedWidth />
                )}
              </div>
              <div className="float-left pt-3 pl-3 roller-text">
                {content.text}
              </div>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Content;
