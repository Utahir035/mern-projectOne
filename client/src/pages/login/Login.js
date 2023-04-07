import React from "react";
import "./login.css";
import { signIn } from "../../api";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = () => {
    console.log({ email, password });
    signIn({
      email: email,
      password: password,
    }).then((result) => {
      console.log(result.data);
      if (result.data.email) {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(result.data));
      } else {
        alert("Please Enter correct detail");
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 style={{ color: " #52A7B2", paddingTop: "40px" }}>Sign In</h2>
        <div className="cards-L">
          <div className="card-L1">
            <h3>REGISTERED CUSTOMERS</h3>
            <p>If you have an account, sign in with your email address.</p>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" onClick={handleLogin} class="btn btn-primary">
              SignIn
            </button>
          </div>
          <div className="card-L2">
            <h3>NEW CUSTOMERS</h3>
            <p>
              Creating an account has many benefits: check out faster, keep more
              than one address, track orders and more.
            </p>
            <button
              type="submit"
              onClick={() => {
                navigate("/register");
              }}
              class="btn btn-primary"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
