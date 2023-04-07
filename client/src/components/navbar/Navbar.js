import React from "react";
import "./navbar.css";
import { FaSearch } from "react-icons/fa";
import Logo from "../../assets/images/Logo.png";
import { useState, useEffect } from "react";
import { getMains } from "../../api";
import { useSelector } from "react-redux";
import { BsCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [mains, setMains] = useState([]);
  const auth = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { totalQuantities } = useSelector((state) => state.CartReducer);

  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getMains()
      .then((response) => setMains(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {token ? (
        <> </>
      ) : (
        <nav class="navbar1 navbar-expand-lg navbar-dark text-light">
          <div className="container cont-N1">
            <img src={Logo} class="navbar-brand " alt="pokemon"></img>
            <ul class=" nav-N1">
              <li class="nav-item">
                {auth ? (
                  <h4 class="nav-link text-light">
                    {JSON.parse(auth).firstname} {JSON.parse(auth).lastname}{" "}
                    <button onClick={Logout} className="btn btn-danger">
                      Logout
                    </button>{" "}
                  </h4>
                ) : (
                  <h4
                    class="nav-link text-light"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </h4>
                )}
              </li>
              <li class="nav-item">
                <h4
                  class="nav-link text-light cartFill"
                  onClick={() => {
                    navigate("/Cart");
                  }}
                >
                  <BsCartFill /> <div className="span">{totalQuantities}</div>
                </h4>
              </li>
            </ul>
          </div>
          <div class="container" style={{ paddingBottom: "20px" }}>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <h5
                    class="nav-link text-light"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Home
                  </h5>
                </li>
                <li class="nav-item">
                  <h5 class="nav-link text-light">Products</h5>
                </li>
                <li class="nav-item dropdown">
                  <h5
                    class="nav-link dropdown-toggle text-light"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </h5>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    {mains.map((main) => (
                      <li
                        onClick={() => {
                          navigate("./Categories/" + main.category);
                        }}
                      >
                        <h5 class="dropdown-item">{main.name}</h5>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn1" type="submit">
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
