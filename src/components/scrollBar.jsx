import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  scrollDirectDetection,
  changeLinkUp,
  changeLinkDown,
  isChevronUpHidden,
  isChevronDownHidden
} from "../uitilities/mouseWheel";
import mouse from "../images/mouse.png";

class ScrollBar extends Component {
  counter = { start: 0, end: 0, isGoing: false };
  state = {
    deltaLevel: 0
  };

  componentDidMount() {
    this.addWindowScrolling();
  }

  addWindowScrolling = () => {
    if ("onwheel" in document) {
      window.addEventListener("wheel", this.handleScroll);
    } else if ("onmousewheel" in document) {
      window.addEventListener("mousewheel", this.handleScroll);
    } else {
      window.addEventListener("MozMousePixelScroll", this.handleScroll);
    }
  };

  handleScroll = event => {
    const counter = this.counter;
    let { deltaLevel } = this.state;
    const e = event || window.event;
    const delta = e.deltaY || e.detail || e.wheelDelta;
    counter.start = counter.start + 1;
    deltaLevel = (delta < 0 ? -delta : delta) / 10;
    this.setState({ deltaLevel });
    if (counter.isGoing) {
      return;
    } else {
      counter.isGoing = true;
      this.mouseWheeling();
      scrollDirectDetection(delta);
    }
  };

  mouseWheeling = () => {
    const counter = this.counter;
    counter.end = counter.start;
    setTimeout(() => {
      if (counter.end === counter.start) {
        counter.isGoing = false;
        counter.start = 0;
        counter.end = 0;
        const deltaLevel = 0;
        this.setState({ deltaLevel });
      } else {
        this.mouseWheeling();
      }
    }, 100);
  };

  render() {
    const { deltaLevel } = this.state;
    const mouseOpacity = 1 - (deltaLevel > 1 ? 1 : deltaLevel);
    return (
      <React.Fragment>
        <ul className="nav flex-column text-right roller-scroll-bar">
          <li className="nav-item my-1 my-xl-2">
            <NavLink
              className="nav-link roller-nav-link"
              activeStyle={{ color: "#181942" }}
              activeClassName="roller-nav-link-active"
              to="/profile"
            >
              PROFILE
            </NavLink>
          </li>
          <li className="nav-item my-1 my-xl-2">
            <NavLink
              className="nav-link roller-nav-link"
              activeStyle={{ color: "#181942" }}
              activeClassName="roller-nav-link-active"
              to="/tracking"
            >
              TRACKING
            </NavLink>
          </li>
          <li className="nav-item my-1 my-xl-2">
            <NavLink
              className="nav-link roller-nav-link"
              activeStyle={{ color: "#181942" }}
              activeClassName="roller-nav-link-active"
              to="/possibility"
            >
              POSSIBILITY
            </NavLink>
          </li>
          <li className="nav-item my-1 my-xl-2">
            <NavLink
              className="nav-link roller-nav-link"
              activeStyle={{ color: "#181942" }}
              activeClassName="roller-nav-link-active"
              to="/topology"
            >
              TOPOLOGY
            </NavLink>
          </li>
          <li className="nav-item my-1 my-xl-2">
            <NavLink
              className="nav-link roller-nav-link"
              activeStyle={{ color: "#181942" }}
              activeClassName="roller-nav-link-active"
              to="/tagging"
            >
              TAGGING
            </NavLink>
          </li>
        </ul>
        <div className="roller-scroll-mouse">
          <div
            className="roller-scroll-guide"
            style={{ opacity: mouseOpacity + 0.1 }}
          >
            <div
              className="text-center roller-scroll-chevron-up"
              onClick={changeLinkUp}
            >
              <FontAwesomeIcon
                icon="chevron-up"
                className={
                  isChevronUpHidden(this.props.pathName)
                    ? "roller-chevron roller-chevron-hidden"
                    : "roller-chevron"
                }
              />
            </div>
            <img src={mouse} alt="mouse" />
            <div
              className="text-center roller-scroll-chevron-down"
              onClick={changeLinkDown}
            >
              <FontAwesomeIcon
                icon="chevron-down"
                className={
                  isChevronDownHidden(this.props.pathName)
                    ? "roller-chevron roller-chevron-hidden"
                    : "roller-chevron"
                }
              />
            </div>
          </div>
          <div
            className="roller-scroll-ban"
            style={{ opacity: 1 - mouseOpacity }}
          >
            <FontAwesomeIcon icon="ban" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ScrollBar;
