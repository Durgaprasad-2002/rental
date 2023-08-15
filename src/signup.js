import React from "react";
import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function Signup() {
  let sp1 = document.getElementById("sp1");
  let sp2 = document.getElementById("sp2");
  sp1.style.display = "block";
  sp2.style.display = "none";
  const location = useLocation();
  let navigate = useNavigate();
  let [cred, setcred] = useState({
    type: "user",
    user: "",
    password: "",
  });

  let database = [];
  const getUser = async () => {
    const response = await fetch(
      "https://busy-ruby-starfish-suit.cyclic.app/getlogcred",
      {
        method: "GET",
      }
    );
    database = await response.json();
  };

  const HandleForm = (e) => {
    setcred((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const post = () => {
    sp1.style.display = "none";
    sp2.style.display = "block";
    axios
      .post("https://busy-ruby-starfish-suit.cyclic.app/postlogcred", {
        cred,
      })
      .then(() => {
        alert("SignUp is Successfull");
        navigate("/Login", {});
      })
      .catch(() => {
        sp1.style.display = "block";
        sp2.style.display = "none";
        alert("signup failed");
      });
    sp1.style.display = "block";
    sp2.style.display = "none";
  };

  function isAlphanumeric(str) {
    const numberRegex = /[0-9]/;
    const alphabetRegex = /[a-zA-Z]/;
    const specialCharRegex = /[^0-9a-zA-Z]/;

    const hasNumber = numberRegex.test(str);
    const hasAlphabet = alphabetRegex.test(str);
    const hasSpecialChar = specialCharRegex.test(str);

    return hasNumber && hasAlphabet && hasSpecialChar;
  }

  const CheckValidity = async (e) => {
    sp1.style.display = "none";
    sp2.style.display = "block";
    if (cred.password.length < 8 || isAlphanumeric(cred.password) == false) {
      sp1.style.display = "block";
      sp2.style.display = "none";
      alert("Password is weak");
      return;
    }
    await getUser();
    for (let index = 0; index < database.length; index++) {
      const element = database[index];
      if (element.user === cred.user && element.type === "user") {
        sp1.style.display = "block";
        sp2.style.display = "none";
        alert("Account Already Exists");
        return;
      }
    }
    post();
  };

  return (
    <div className="sign">
      <form className="form">
        <span className="signup">Sign Up</span>
        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          name="user"
          required
          onChange={HandleForm}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form--input"
          onChange={HandleForm}
          required
        />

        <button className="form--submit" type="button" onClick={CheckValidity}>
          <article id="sp1">Sign Up</article>
          <article id="sp2"></article>
        </button>
      </form>
    </div>
  );
}
