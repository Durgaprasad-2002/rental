import React, { useState, useEffect } from "react";
import "./CarStatus.css";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarOwner from "./NavbarOwner";
import axios from "axios";
import {
  BsLinkedin,
  BsGithub,
  BsFacebook,
  BsTwitter,
  BsWhatsapp,
  BsMailbox,
  BsMailbox2,
  BsPinMapFill,
  BsFile,
} from "react-icons/bs";
export default function ViewStatusOwner() {
  let navigate = useNavigate();

  //----------getting Todays Date-------------

  const currentdate = new Date();
  const datecurr = [
    currentdate.getFullYear(),
    currentdate.getMonth() + 1,
    currentdate.getDate(),
  ];

  let [AllBookings, setAllbookings] = useState([]);

  const CheckValid = async (data) => {
    const result = data.filter(checkcar);

    function checkcar(car) {
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

    setAllbookings(result);
  };
  //----------Getting All bookings data--------------------------------------------

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

  useEffect(() => {
    getbookings();
  }, []);

  let [car, setcar] = useState({});

  let Modaldata = () => {
    return (
      <div
        class="card card-body"
        style={{
          padding: "4px",
          margin: "0px 0px 0px 0px",
          overflow: "scroll",
        }}
      >
        <table>
          <tr>
            <td>User Name</td>
            <td className="cen">:</td>
            <td>{car?.name || car?.BookingDetails?.name}</td>
          </tr>
          <tr>
            <td>User Mobile</td>
            <td className="cen">:</td>
            <td>{car?.mobil || car?.BookingDetails?.mobil}</td>
          </tr>
          <tr>
            <td>User Address</td>
            <td className="cen">:</td>
            <td>{car?.address || car?.BookingDetails?.address}</td>
          </tr>
          <tr>
            <td>From Time</td>
            <td className="cen">:</td>
            <td>{car?.StartTime || car?.BookingDetails?.StartTime}</td>
          </tr>
          <tr>
            <td>To Time</td>
            <td className="cen">:</td>
            <td>{car?.EndTime || car?.BookingDetails?.EndTime}</td>
          </tr>
          <tr>
            <td>Total Rent</td>
            <td className="cen">:</td>
            <td>{car?.car_rent || car?.BookingDetails?.car_rent}/-</td>
          </tr>
        </table>
      </div>
    );
  };

  let Loading = <Loadings />;
  let Maincon = (
    <>
      <NavbarOwner />
      <div
        className="con"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {AllBookings.map((car) => {
          return (
            <>
              <div
                class="card"
                style={{
                  margin: "0px 3px 30px 3px",
                  width: "280px",
                  minWidth: "250px",
                  padding: "0px 6px  0px 0px",
                  boxShadow: "0px 4px 8px 0px black",
                  border: "none",
                }}
              >
                <img
                  src={car.car_image || car.BookingDetails.car_image}
                  class="card-img-top"
                  alt="car Image"
                />
                <div class="card-body" style={{ padding: "7px 5px 0px 5px" }}>
                  <h6 class="card-title">
                    <b
                      style={{
                        lineHeight: "30px",
                      }}
                    >
                      {car?.car_name || car?.BookingDetails?.car_name}
                    </b>
                    <br />
                    <button
                      onClick={() => setcar(car)}
                      class="btn btn-primary btn-sm"
                      className="btn btn-outline-primary btn-outline-1"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                      style={{
                        margin: "0px 0px 5px 0px",
                        float: "left",
                      }}
                    >
                      Show Status
                    </button>
                  </h6>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <footer style={{ position: "relative" }}>
        <div style={{ height: "20px", padding: "10px 0px 0px 0px" }}>
          <hr />
        </div>
        <div className="footer">
          <div className="Cp">
            <p>
              <b>BBT</b> © DurgaPrasad
            </p>
          </div>
          <div className="digiAccounts">
            <a
              href="https://www.linkedin.com/in/veera-venkata-sai-durga-prasad-thota-60653020a/"
              target="new"
            >
              {" "}
              <BsLinkedin
                className="accs"
                to="https://www.linkedin.com/in/veera-venkata-sai-durga-prasad-thota-60653020a/"
              />
            </a>

            <a href="https://github.com/Durgaprasad-2002" target="new">
              {" "}
              <BsGithub
                className="accs"
                to="https://github.com/Durgaprasad-2002"
              />
            </a>

            <a href="https://wa.me/9177943677?text=Hello..!" target="new">
              {" "}
              <BsWhatsapp
                className="accs"
                to="https://wa.me/9177943677?text=Hello..!"
              />
            </a>

            <a href="mailto:prasaddurga2031@gmail.com" target="new">
              {" "}
              <BsMailbox className="accs" />
            </a>
          </div>
        </div>
      </footer>

      {/* --------------------- modal Data --------------------- */}
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
                Booking Details
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
                padding: "30px",
              }}
            >
              {Modaldata()}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return AllBookings.length != 0 ? Maincon : Loading;
}
