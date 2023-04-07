import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

import "./products.css";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [quantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  const getProducts = async () => {
    await axios
      .get(`http://localhost:5000/Products/${params.category}`)
      .then((response) => {
        setProducts(response.data);
      });
  };

  useEffect(() => {
    getProducts();
  });

  return (
    <>
      <Navbar />
      {products.length > 0 ? (
        <div className="container cont-P">
          {products.map((product) => (
            <div
              className="card px-4 py-3 card-P"
              onClick={() => {
                navigate("/product/" + product._id);
              }}
            >
              <img
                src={`http://localhost:5000/${product.image}`}
                alt="Pokemon"
              ></img>
              <p>{product.name}</p>
              <h5>{product.price} AED</h5>
              <>
                <p>Size</p>
                <p className="btn-P1">{product.size}</p>
              </>
              <button
                className="btn-P"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: { product, quantity },
                  })
                }
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="alert alert-danger" role="alert">
          No Products Found
        </h2>
      )}
    </>
  );
}

export default Products;
