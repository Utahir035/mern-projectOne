import React from "react";
import Banner1 from "../../assets/images/Banner1.png";
import Banner2 from "../../assets/images/Banner2.png";
import "./carousal.css";

function Carousal() {
  return (
    <>
      <div id="demo" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="0"
            class="active"
          ></button>
          <button
            type="button"
            data-bs-target="#demo"
            data-bs-slide-to="1"
          ></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={Banner1} alt="Los Angeles" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src={Banner2} alt="Chicago" class="d-block w-100" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousal;
