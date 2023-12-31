import React from "react";
import "./singleCar.css";
import Loadings from "./Loadings";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./Navbar";
import $, { post } from "jquery";
import Popper from "popper.js";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState, useRef } from "react";
import axios from "axios";
export default function SingleCar() {
  const location = useLocation();
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;

  let [BookingDetails, SetBookingDetails] = useState({
    car_id: location.state._id,
    car_name: location.state.car_name,
    car_image: location.state.car_image,
    car_rent: location.state.car_rent,
    car_fuel: location.state.car_fuel,
    car_seating: location.state.car_seating,
    car_number: location.state.car_number,
    location: "",
    name: "",
    mobil: "",
    address: localStorage.getItem("userMail"),
    Date: date,
    StartTime: "",
    EndTime: "",
  });

  const HandleForm = (e) => {
    SetBookingDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const PostData = (e) => {
    e.preventDefault();
    axios.post("https://busy-ruby-starfish-suit.cyclic.app/postbookingdata", {
      BookingDetails,
    });
    alert("Successfully Booked");
  };

  //--------------UI Of Booking Car------------------------------------------
  let FormData = (
    <div>
      <form onSubmit={PostData}>
        <TextField
          className="IN"
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          onChange={HandleForm}
          required
        />
        <br />
        <br />
        <TextField
          className="IN"
          name="mobil"
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          onChange={HandleForm}
          required
        />

        <br />
        <br />
        <TextField
          className="IN"
          name="location"
          id="outlined-basic"
          label="Loaction Of Pick Up"
          variant="outlined"
          onChange={HandleForm}
          required
        />
        <br />
        <br />
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label htmlFor="StDate" style={{ fontWeight: "700" }}>
            From Date
          </label>
          <input
            required
            name="StartTime"
            id="StDate"
            type="datetime-local"
            onChange={HandleForm}
            style={{
              fontWeight: "200",
              width: "100%",
              border: "1.5px solid lightgrey",
              margin: "3px 0px 0px 0px",
              padding: "5px",
            }}
          />
          <label htmlFor="StDate" style={{ fontWeight: "700" }}>
            To Date
          </label>
          <input
            required
            name="EndTime"
            id="StDate"
            type="datetime-local"
            onChange={HandleForm}
            style={{
              fontWeight: "200",
              width: "100%",
              border: "1.5px solid lightgrey",
              margin: "3px 0px 25px 0px",
              padding: "5px",
            }}
          />
          <button
            style={{
              marginBlockStart: "1%",
              marginInlineStart: "0%",
            }}
            type="submit"
            className="btn btn-primary sub"
          >
            Book It
          </button>
          <button
            style={{
              float: "right",
              margin: "5px 0px 0px 0px",
            }}
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );

  let Loading = <Loadings />;
  let MainCon = (
    <>
      <Navbar />
      <div className="singlecarmain">
        <div className="carbooking">
          <div className="carimg">
            <div className="card text-bg-dark mb-3">
              <div className="card-header ">BigBoyToyz Rentals</div>
              <div className="card-body">
                <div className="card mb-3 bg-dark">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={location.state.car_image}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body bg-dark">
                        <h3 className="card-title">
                          {location.state.car_name}
                        </h3>
                        <hr />
                        <p className="card-text">
                          <small className="text-body-secondary">
                            {location.state.car_rent} Rent Per hour /-
                          </small>
                          <br />
                          <small className="text-body-secondary">
                            Fuel Type : {location.state.car_fuel}
                          </small>
                          <br />
                          <small className="text-body-secondary">
                            Max Persons : {location.state.car_seating}
                          </small>
                          <br />
                          <hr />
                          <small className="text-body-secondary">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-outline-1"
                              data-bs-target="#exampleModalToggle"
                              data-bs-toggle="modal"
                            >
                              Book Car
                            </button>
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -----------------------------Modals for Booking Car */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div
          className="modal-dialog modal-dialog-centered "
          style={{
            width: "auto",
            maxWidth: "500px",
            minWidth: "310px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Enter Your Details
              </h1>
              <button
                type="button"
                className="btn-close bg-light "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "30px 30px 0px 30px ",
              }}
            >
              {FormData}
            </div>
          </div>
        </div>
      </div>

      {/* -----------------------------Modals for Payment */}

      {/* <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Payment
              </h1>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{Payment}</div>
            <div className="modal-footer">
              <button className="btn btn-primary" data-bs-dismiss="modal">
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );

  return location.state.car_image != "" ? MainCon : Loading;
}

{
  /* <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"

            >
              <strong>Payment Successful !</strong> You wil get your car soon
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div> */
}
