import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./UserDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Loadings from "./Loadings";
import Popper from "popper.js";
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
import { Link, useNavigate } from "react-router-dom";
export default function UserDashboard() {
  const navigate = useNavigate();
  let [CarsDetails, setCarsDetails] = useState([]);

  const getUser = async () => {
    const response = await fetch(
      "https://busy-ruby-starfish-suit.cyclic.app/getdata",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setCarsDetails(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const toComponentB = (id) => {
    const list = CarsDetails;
    const employee = list.filter((incar) => incar._id == id);
    navigate("/single", { state: employee[0] });
  };

  let Loading = <Loadings />;
  let MainCon = (
    <>
      <div>
        <Navbar />
        <div>
          <br />
          <br />
          <h3
            style={{
              color: "white",
              fontFamily: "serif",
              textAlign: "left",
              marginInlineStart: "5%",
              fontSize: "2rem",
            }}
          >
            Our Car Collection
            <article
              style={{ border: "2px solid lightblue", width: "15.3rem" }}
            ></article>
          </h3>
        </div>
        <div className="AvailableCars">
          {CarsDetails.map((car) => {
            return (
              <>
                <div className="carInfo">
                  <img className="image" src={car.car_image} />
                  <div className="carPricing">
                    <article>
                      <h5>
                        {car.car_name}{" "}
                        <button
                          style={{ float: "right", borderRadius: "13px" }}
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            toComponentB(car._id);
                          }}
                        >
                          More Info
                        </button>
                      </h5>
                      {/* <h6>
                      <b style={{ fontWeight: "500" }}>Rent Price </b> :{" "}
                      {car.car_rent}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          toComponentB(car._id);
                        }}
                      >
                        More Info
                      </button>
                    </h6> */}
                    </article>
                  </div>
                </div>
              </>
            );
          })}
        </div>
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
    </>
  );
  return CarsDetails.length != 0 ? MainCon : Loading;
}
