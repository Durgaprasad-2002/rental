import React from "react";
import "./main.css";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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

export default function Main() {
  let navigate = useNavigate();

  // const notify = () => toast("Wow so easy !");

  return (
    <>
      <h2
        style={{
          background: "#202020",
          width: "100%",
          height: "80px",
          marginTop: "-60px",
          marginBottom: "70px",
          textAlign: "center",
          color: "white",
          textShadow: "3px 3px 2px slategrey",
          fontFamily: "fantasy",
          paddingBlockStart: "20px",
        }}
      >
        Big Boy Toyz Rentals
      </h2>
      <div className="body">
        <div className="Contents">
          {/* <div>
            <button onClick={notify}>Notify !</button>
            <ToastContainer />
          </div> */}
          <div className="conCard">
            <div class="card">
              <div className="div">
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPtJ8ELxEzK-1PY0jN8kAv9UbBuYiwv-4_-jVL0cMms6tQ4kI_VBOD7SOPn70deNFlP4&usqp=CAU"
                />
                <h5 style={{ textAlign: "center" }}>User's </h5>
              </div>
              <div className="cont">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/Login", { state: {} })}
                >
                  User Login
                </button>
              </div>
            </div>
          </div>

          <div className="conCard">
            <div class="card">
              <div className="div">
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                  src="https://media.istockphoto.com/id/1008952574/vector/hand-giving-a-key-to-other-hand-icon-vector-black-illustration.jpg?s=612x612&w=0&k=20&c=8fuve1RN2_RptH1GxRaeNgR1eSRV113xxIGWL2806PY="
                />
                <h5 style={{ textAlign: "center" }}>Owner's </h5>
              </div>
              <div className="cont">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    (window.location.href = "/Client_Car/LoginOwner")
                  }
                >
                  Owner Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
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
}
