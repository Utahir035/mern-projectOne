import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./categories.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const getCategories = async () => {
    await axios
      .get(`http://localhost:5000/Categories/${params.category}`)
      .then((response) => {
        setCategories(response.data);
      });
  };

  useEffect(() => {
    getCategories();
  });

  return (
    <>
      <Navbar />
      <div className="container border-bottom">
        {categories.map((category) => (
          <div className="container-C">
            <h3>
              {category.name} <button className="btn-C">Shop All</button>
            </h3>

            <div className="d-flex d-flex1">
              {category.subcategories.map((items) => (
                <div
                  className="card sticky-card"
                  onClick={() => {
                    navigate("/Products/" + items.category);
                  }}
                >
                  <img src={items.image} alt="Pikachu"></img>
                  <p>{items.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
