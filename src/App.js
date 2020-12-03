import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBike from "./components/bikes/add-bike.component";
import Bike from "./components/bikes/bike.component";
import BikeList from "./components/bikes/bike-list.component";

class App extends Component {

  render() {
    console.log(process.env.REACT_APP_NAME);
    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              {/* this will reload the whole page */}
              <a href="/bikes" className="navbar-brand">
                React frontend
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/bikes"} className="nav-link">
                    Bikes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
              </div>
            </nav>

            {/* className="container mt-3" */}
            <div className="container-expand mt-3">
              <Switch>
                <Route
                    exact
                    path={"/bikes"}
                    component={BikeList}
                />
                <Route exact path="/add" component={AddBike} />
                <Route path="/bikes/:id" component={Bike} />
              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;