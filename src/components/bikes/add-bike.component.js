import React, { Component } from "react";
//import BikeDataService from "../../services/bike.service";
import http from "../../services/httpService";

export default class AddBike extends Component {
    constructor(props) {
        super(props);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeFrameSize = this.onChangeFrameSize.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.saveBike = this.saveBike.bind(this);
        this.newBike = this.newBike.bind(this);

        this.state = {
            bikeId: null,
            type: "",
            state: "",
            brand: "",
            frameSize: "",
            price: null,

            submitted: false,
        };
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value,
        });
    }

    onChangeState(e) {
        this.setState({
            state: e.target.value,
        });
    }

    onChangeBrand(e) {
        this.setState({
            brand: e.target.value,
        });
    }

    onChangeFrameSize(e) {
        this.setState({
            frameSize: e.target.value,
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
        });
    }

    saveBike() {
        var data = {
            type: this.state.type,
            state: this.state.state,
            brand: this.state.brand,
            frameSize: this.state.frameSize,
            price: this.state.price
        };

        http
            .post("/bikes", data) // http POST request
            .then((response) => {
                this.setState({
                    bikeId: response.data.bikeId,
                    type: response.data.type,
                    state: response.data.state,
                    brand: response.data.brand,
                    frameSize: response.data.frameSize,
                    price: response.data.price,

                    submitted: true,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newBike() {
        this.setState({
            bikeId: null,
            type: "",
            state: "",
            brand: "",
            frameSize: "",
            price: null,

            submitted: false,
        });
    }


    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newBike}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                required
                                value={this.state.type}
                                onChange={this.onChangeType}
                                name="type"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                required
                                value={this.state.state}
                                onChange={this.onChangeState}
                                name="state"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input
                                type="text"
                                className="form-control"
                                id="brand"
                                required
                                value={this.state.brand}
                                onChange={this.onChangeBrand}
                                name="brand"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="frame-size">Frame Size</label>
                            <input
                                type="text"
                                className="form-control"
                                id="frame-size"
                                required
                                value={this.state.frameSize}
                                onChange={this.onChangeFrameSize}
                                name="frame-size"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                required
                                value={this.state.price}
                                onChange={this.onChangePrice}
                                name="price"
                            />
                        </div>

                        <button onClick={this.saveBike} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }


}