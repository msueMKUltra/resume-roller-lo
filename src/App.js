import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NavBar from "./components/navBar";
import Profile from "./components/profile";
import Tracking from "./components/tracking";
import Possibility from "./components/possibility";
import Topology from "./components/topology";
import NotFound from "./components/notFound";
import ScrollBar from "./components/scrollBar";
import "./App.sass";

class App extends Component {
  mouse = React.createRef();
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="roller-background fixed-top" />
        <div className="container roller-container">
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Route
              render={({ location }) => (
                <React.Fragment>
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      timeout={600}
                      classNames="fade"
                    >
                      <Switch location={location}>
                        <Route path="/profile" component={Profile} />
                        <Route path="/tracking" component={Tracking} />
                        <Route path="/possibility" component={Possibility} />
                        <Route path="/topology" component={Topology} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="/" exact to="/profile" />
                        <Redirect from="/profile" exact to="/profile" />
                        <Redirect from="/tracking" exact to="/tracking" />
                        <Redirect from="/possibility" exact to="/possibility" />
                        <Redirect from="/topology" exact to="/topology" />
                        <Redirect to="/not-found" />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                  <ScrollBar pathName={location.pathname} />
                </React.Fragment>
              )}
            />
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
