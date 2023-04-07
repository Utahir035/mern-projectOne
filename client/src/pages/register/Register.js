import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../../components/navbar/Navbar';
import { signUp } from "../../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleSignup = (e) => {
    e.preventDefault()
    console.log({ firstname, lastname, email, password });
    signUp({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data);
        navigate("/login");
        alert("Successfully Registered");
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  };


  return (
   <>
    <Navbar/>
   <form className='container'>
    <h3>Create New Customer Account</h3>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">First Name</label>
    <input type="text" class="form-control" onChange={(e) => setFirstName(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Last Name</label>
    <input type="text" class="form-control" onChange={(e) => setLastName(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email</label>
    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" onClick={handleSignup} class="btn btn-primary">Submit</button>
</form>
   </>
  )
}

export default Register