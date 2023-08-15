import React, { useState, useEffect } from "react";
import "./CarStatus.css";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import axios from "axios";
export default function CarStatus() {
  let navigate = useNavigate();
  //----------getting Todays Date-------------

  const current = new Date();
  const date = [
    current.getFullYear(),
    current.getMonth() + 1,
    current.getDate(),
  ];

  const Deletedata = (e) => {
    axios
      .delete(`https://busy-ruby-starfish-suit.cyclic.app/deletebook/${e}`, {})
      .then(() => {
        alert("Successfully deleted");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Trying Again Cause Server is Busy");
      });
  };

  //----------getting Todays Date-------------

  const currentdate = new Date();
  const datecurr = [
    currentdate.getFullYear(),
    currentdate.getMonth() + 1,
    currentdate.getDate(),
  ];
  //----------Getting All bookings data--------------------------------------------

  var [AllBookings, setAllbookings] = useState([]);

  const CheckValid = async (data) => {
    const result = data.filter(checkcar);

    function checkcar(car) {
      if (
        car?.BookingDetails?.address === localStorage.getItem("userMail") ||
        car?.address === localStorage.getItem("userMail")
      ) {
        const tempdate_time =
          car?.EndTime?.split("T") || car?.BookingDetails?.EndTime?.split("T");
        const tempdate = tempdate_time[0]?.split("-");

        if (parseInt(tempdate[0]) >= parseInt(datecurr[0])) {
          if (parseInt(tempdate[1]) == parseInt(datecurr[1])) {
            if (parseInt(tempdate[2]) > parseInt(datecurr[2])) return car;
          } else if (parseInt(tempdate[1]) > parseInt(datecurr[1])) {
            return car;
          }
        }
      }
    }

    setAllbookings(result);
  };

  const getbookings = async () => {
    // const response = await fetch("https://busy-ruby-starfish-suit.cyclic.app/bookingsdata", {
    //   method: "GET",
    // });
    await axios
      .get("https://busy-ruby-starfish-suit.cyclic.app/bookingsdata")
      .then((items) => {
        CheckValid(items.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [up, setup] = useState(0);

  useEffect(() => {
    getbookings();
  }, []);

  let Alter = (
    <>
      <Navbar />
      <div className="NoBookings">
        <h3 className="No-title">Currently No Bookings......!</h3>
        <p className="No-Deatail">
          For booking visit our Car's Collection{"   "}
          <a href="/Client_Car/dash" className="A-btn">
            View
          </a>
        </p>
      </div>
    </>
  );

  let TranForm = (ele) => {
    navigate("/modify", { state: ele });
    setup(up + 1);
  };

  let Maincon = (
    <>
      <Navbar />
      <div className="con">
        {AllBookings.map((car) => {
          return (
            <>
              <div className="inncard">
                <div>
                  <img
                    style={{
                      zIndex: "1",
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "250px",
                      minWidth: "200px",
                    }}
                    src={car?.BookingDetails?.car_image || car?.car_image}
                    class="card-img-top"
                    alt="car Image"
                  />
                </div>
                <div className="info">
                  <h6>
                    <b>Booking Name </b>: {car.name || car.BookingDetails.name}
                    <hr style={{ border: "1px solid black" }} />
                  </h6>

                  <p>
                    <b>PickUp Location </b>:{" "}
                    {car.location || car.BookingDetails.location} <br />
                    <b>Mobile No </b> : {car.mobil || car.BookingDetails.mobil}
                    <br />
                    <b>Model </b> :{" "}
                    {car.car_name || car.BookingDetails.car_name}
                  </p>
                  <div className="btns">
                    <button className="bt" onClick={() => TranForm(car)}>
                      Change Details
                    </button>
                    {/* <button className="bt">Feedback</button> */}
                    <button className="bt" onClick={() => Deletedata(car._id)}>
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="detail">
                  <h5 class="card-title"> Booking Timmings & Rent : {"   "}</h5>
                  <table id="table">
                    <tr>
                      <td>From Time</td>
                      <td className="cen">:</td>
                      <td>{car.StartTime || car.BookingDetails.StartTime}</td>
                    </tr>
                    <tr>
                      <td>To Time</td>
                      <td className="cen">:</td>
                      <td>{car.EndTime || car.BookingDetails.EndTime}</td>
                    </tr>
                    <tr>
                      <td>Total Rent</td>
                      <td className="cen">:</td>
                      <td>{car.car_rent || car.BookingDetails.car_rent}/-</td>
                    </tr>
                  </table>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
  return AllBookings.length !== 0 ? Maincon : Alter;
}
