import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/admin/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.admin) {
          navigate("/Admin");
          localStorage.setItem("token", result.data.auth);
          localStorage.setItem("admin", JSON.stringify(result.data));
        } else {
          alert("Please Enter correct detail");
        }
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h3>Admin</h3>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {/* <span>Wrong email or password!</span> */}
      </form>
    </div>
  );
};

export default Login;
