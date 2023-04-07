import "./datatable.scss";
import { Link } from "react-router-dom";
import { getProducts, deleteProducts } from "../../../api";
import { useState, useEffect } from "react";

const Datatable = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    deleteProducts(id).then(() => console.log('Data deleted successfully.'))
    .catch(error => console.error(error));
  };

  useEffect(() => {
    getProducts()
    .then(response => setProducts(response.data))
    .catch(error => console.error(error));
  }, []);

  return (
    <div class="table-responsive">
      <Link to="/Admin/products/new" style={{ textDecoration: "none" }}>
        <button
          type="button"
          class="btn btn-info btn-lg text-light float-end m-3"
        >
          Add New
        </button>
      </Link>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                <div className="cellWithImg">
                  <img
                    class="rounded-circle img-fluid"
                    style={{ height: "40px", width: "40px" }}
                    src={`http://localhost:5000/${product.image}`}
                    alt="avatar"
                  />
                  {product.name}
                </div>
              </td>
              <td> {product.price}</td>
              <td> {product.category}</td>
              <td>
                <button type="button" class="btn btn-outline-primary me-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/Admin/products/product/" + product._id}
                  >
                    Update
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
