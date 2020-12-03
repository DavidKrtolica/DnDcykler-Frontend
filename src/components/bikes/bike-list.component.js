import React, { Component } from "react";
import http from "../../services/httpService";
import { Link } from "react-router-dom";


export default class BikeList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchParam = this.onChangeSearchParam.bind(this);
        this.retrieveBikes = this.retrieveBikes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBike = this.setActiveBike.bind(this);
        this.removeAllBikes = this.removeAllBikes.bind(this);
        this.searchParam = this.searchParam.bind(this);
        this.setPage = this.setPage.bind(this);

        this.state = {
            // state variable
            bikes: [],
            currentBike: null,
            currentIndex: -1,
            searchParam: "",
            currentPage: 0,
            totalPages: 0,
        };
    }

    componentDidMount() {
        this.retrieveBikes(this.state.currentPage);
    }

    onChangeSearchParam(e) {
        const searchParam = e.target.value;

        this.setState({
            searchParam: searchParam,
        });
    }

    retrieveBikes(currentPage) {
        http
            .get("/bikes?page=" + currentPage)
            .then((response) => {
                //this is the response from web server
                this.setState({
                    bikes: response.data.bikes,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                });
                console.log(response.data); //print in console, just for testing
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBikes(this.state.currentPage);
        this.setState({
            currentBike: null,
            currentIndex: -1,
        });
    }

    setActiveBike(bike, index) {
        this.setState({
            currentBike: bike,
            currentIndex: index,
        });
    }

    removeAllBikes() {
        http
            .delete("/bikes")
            .then((response) => {
                console.log(response.data);
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    searchParam() {
        http
            .get("/bikes?parameter=" + this.state.searchParam)
            .then((response) => {
                this.setState({
                    bikes: response.data.bikes,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    setPage(increment) {
        this.retrieveBikes(this.state.currentPage + increment);
        this.setState({ currentPage: this.state.currentPage + increment });
    }

    render() {
        const {
            searchParam,
            bikes,
            currentBike,
            currentIndex,
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by parameter"
                            value={searchParam}
                            onChange={this.onChangeSearchParam}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchParam}
                            >
                                Search
                            </button>
                            {this.state.currentPage < this.state.totalPages - 1 ? (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => this.setPage(1)}
                                >
                                    Next
                                    {/* {this.state.currentPage === this.state.totalPages - 1
                  ? "Previous"
                  : "Next"} */}
                                </button>
                            ) : (
                                ""
                            )}
                            {this.state.currentPage === 0 ? (
                                ""
                            ) : (
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => this.setPage(-1)}
                                >
                                    Previous
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Bike List</h4>

                    <ul className="list-group">
                        {bikes &&
                        bikes.map((bike, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveBike(bike, index)}
                                key={index}
                            >
                                {bike.brand}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllBikes}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentBike ? (
                        <div>
                            <h4>Bike</h4>
                            <div>
                                <label>
                                    <strong>Brand:</strong>
                                </label>{" "}
                                {currentBike.brand}
                            </div>
                            <div>
                                <label>
                                    <strong>Type:</strong>
                                </label>
                                {"    "}
                                {currentBike.type}
                            </div>
                            <div>
                                <label>
                                    <strong>State:</strong>
                                </label>{" "}
                                {currentBike.state}
                            </div>

                            <Link
                                to={"/bikes/" + currentBike.bikeId}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Bike...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
