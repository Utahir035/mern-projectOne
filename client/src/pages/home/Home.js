import React from "react";
import { useState, useEffect } from "react";
import { getMains } from "../../api";
import Navbar from "../../components/navbar/Navbar";
import Carousal from "../../components/carousal/Carousal";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import "./home.css";

function Home() {
  const [mains, setMains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMains()
      .then((response) => setMains(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Navbar />
      <Carousal />
      <div className="container" style={{ paddingTop: "40px" }}>
        <h3>Shop By Pet</h3>
        <div className="cont-1">
          {mains.map((main) => (
            <img
              className="image1 "
              src={`http://localhost:5000/${main.image}`}
              alt="pikachu"
              onClick={() => {
                navigate("./Categories/" + main.category);
              }}
            ></img>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
