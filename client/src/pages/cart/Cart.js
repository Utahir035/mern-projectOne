import React from "react";
import "./cart.css";
import { postOrder } from "../../api";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const auth = localStorage.getItem("user");

  const { products, totalPrice, totalQuantities } = useSelector(
    (state) => state.CartReducer
  );

  const navigate = useNavigate("");
  const price = totalPrice;
  const quantity = totalQuantities;
  const orderItems = products.map((product) => ({
    name: product.name,
    category: product.category,
  }));

  function Cancel() {
    window.location.reload();
  }

  const submitOrder = () => {
    postOrder({
      name: JSON.parse(auth).firstname + JSON.parse(auth).lastname,
      email: JSON.parse(auth).email,
      price: price,
      items: orderItems,
      quantity: quantity,
    }).then((result) => {
      console.log(result.data);
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <>
      <Navbar />
      {products.length > 0 ? (
        <>
          <div className="container">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>PRICE</th>
                  <th className="display">QTY</th>
                  <th className="display">SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>
                      <div className="cont-C">
                        <img
                          src={`http://localhost:5000/${product.image}`}
                          alt="Pokemon"
                        ></img>
                        <div className="cont-C1">
                          <h4>{product.name}</h4>
                          <p>SIZE:{product.size}</p>
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              dispatch({
                                type: "REMOVE",
                                payload: product._id,
                              })
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="display">{product.price}</td>
                    <td className="display">
                      <div className="details__incDec">{product.quantity}</div>
                    </td>
                    <td>{product.price * product.quantity} AED</td>
                  </tr>
                ))}
                <tr>
                  <td className="display"></td>
                  <td className="display"></td>
                  <th>Subtotal:</th>
                  <th>{totalPrice} AED</th>
                </tr>
              </tbody>
            </table>
            <div className="display-C">
              <h4> Subtotal: {totalPrice} AED</h4>
            </div>
            <div className="display-C">
              {auth ? (
                <button
                  onClick={submitOrder}
                  className="btn btn-default btn-C3"
                >
                  Checkout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="btn btn-default btn-C3"
                >
                  Checkout
                </button>
              )}
              <button className="btn btn-default btn-C4" onClick={Cancel}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <h4 className="container text-secondary"> No Products in Cart </h4>
      )}
    </>
  );
}

export default Cart;
