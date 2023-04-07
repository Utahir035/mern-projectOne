import React from "react";
import "./details.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import { BsDash, BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";

function Details() {
  const [product, setProducts] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  });

  const decQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getProductDetails = async () => {
    await axios
      .get(`http://localhost:5000/product/${params.id}`)
      .then((response) => {
        setProducts(response.data);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container mt-100">
        <div className="row">
          <div className="col-6">
            <div className="details__image">
              <img src={`http://localhost:5000/${product.image}`} alt="" />
            </div>
          </div>
          <div className="col-6">
            <div className="details__name">{product.name}</div>
            <div className="details__prices">
              <span className="details__actaul">{product.price}</span>
            </div>
            <div className="details__info">
              <div className="details__incDec">
                <span className="dec" onClick={decQuantity}>
                  <BsDash />
                </span>
                <span className="quantity">{quantity}</span>
                <span className="inc" onClick={() => setQuantity(quantity + 1)}>
                  <BsPlus />
                </span>
                <button
                  className="btn-default"
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: { product, quantity },
                    })
                  }
                >
                  add to cart
                </button>
              </div>
            </div>
            <div className="details__p">
              <h4>Details</h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              aspernatur, quo nostrum natus dolor obcaecati reprehenderit
              reiciendis, repellat omnis voluptates et, dolorem maxime iure
              sapiente laboriosam quia! Aliquam, vel soluta?
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
