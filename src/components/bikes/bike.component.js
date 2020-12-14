import React, { Component } from "react";
import http from "../../services/httpService";

export default class Bike extends Component {
    constructor(props) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeFrameSize = this.onChangeFrameSize.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.getBike = this.getBike.bind(this);
        this.updateBike = this.updateBike.bind(this);
        this.deleteBike = this.deleteBike.bind(this);

        this.state = {
            currentBike: {
                bikeId: null,
                type: "",
                state: "",
                brand: "",
                frameSize: "",
                price: null,
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getBike(this.props.match.params.id);
    }

    onChangeType(e) {
        const type = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBike: {
                    ...prevState.currentBike,
                    type: type,
                },
            };
        });
    }

    onChangeState(e) {
        const state = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBike: {
                    ...prevState.currentBike,
                    state: state,
                },
            };
        });
    }

    onChangeBrand(e) {
        const brand = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBike: {
                    ...prevState.currentBike,
                    brand: brand,
                },
            };
        });
    }

    onChangeFrameSize(e) {
        const frameSize = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBike: {
                    ...prevState.currentBike,
                    frameSize: frameSize,
                },
            };
        });
    }

    onChangePrice(e) {
        const price = e.target.value;

        this.setState(function (prevState) {
            return {
                currentBike: {
                    ...prevState.currentBike,
                    price: price,
                },
            };
        });
    }


    getBike(id) {
        //http.get("/bike/" + id    );
        http
            .get("/bikes/" + id)
            .then((response) => {
                this.setState({
                    currentBike: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateBike() {
        http
            .put(
                "/bikes/" + this.state.currentBike.id,
                this.state.currentBike
            )
            .then((response) => {
                console.log(response.data);
                this.setState({
                    message: "The bike was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteBike() {
        http
            .delete("/bikes/" + this.state.currentBike.id)
            .then((response) => {
                console.log(response.data);
                this.props.history.push("/bikes");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentBike } = this.state;

        return (
            <div>
                {currentBike ? (
                    <div className="edit-form">
                        <h4>Bike</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    value={currentBike.type}
                                    onChange={this.onChangeType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    value={currentBike.state}
                                    onChange={this.onChangeState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="brand">Brand</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    value={currentBike.brand}
                                    onChange={this.onChangeBrand}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="frame-size">Frame Size</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="frame-size"
                                    value={currentBike.frameSize}
                                    onChange={this.onChangeFrameSize}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    value={currentBike.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteBike}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateBike}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Bike...</p>
                    </div>
                )}
            </div>
        );
    }

}