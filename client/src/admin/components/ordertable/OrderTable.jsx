import React from "react";
import { useState, useEffect } from "react";
import "./OrderTable.css";
import { getOrders } from "../../../api";

function OrderTable() {
  const [orders, setOrders] = useState([]);

  // const getOrders = async () => {
  //   await axios.get("http://localhost:5000/Orders").then((response) => {
  //     setOrders(response.data);
  //   });
  // };
  useEffect(() => {
    getOrders()
      .then(response => setOrders(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteOrder = async (id) => {
    let result = await fetch(`http://localhost:5000/Orders/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getOrders();
    }
  };

  return (
    <div className="d-flex gap-4 flex-wrap px-4 py-4">
      {orders.map((order) => (
        <div
          class="card1"
          style={{ width: "30%", color: "black" }}
          key={order._id}
        >
          <div class="card-body">
            <h5 class="card-title">Order ID:{order._id}</h5>
            <h5 class="card-title">Name:{order.name}</h5>
            <p class="card-text">Email:{order.email}</p>
            <p class="card-text">Time:{order.time}</p>
            <p class="card-text">Time:{order.date}</p>
          </div>
          <ul class="list-group list-group-flush">
            {order.items.map((item, index) => (
              <li class="list-group-item">
                {index + 1}-Products:-{item.name}+{item.category}
              </li>
            ))}
            <li class="list-group-item">Quantity:{order.quantity}</li>
            <li class="list-group-item">Total Price:{order.price}</li>
          </ul>
          <div class="card-body">
            <button
              type="button"
              onClick={() => deleteOrder(order._id)}
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderTable;
