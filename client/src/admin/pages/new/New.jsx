import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ title }) => {
  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const handleAddProduct = () => {
    console.log({ name, price, category, image, size });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("size", size);


    axios
      .post("http://localhost:5000/add-product", formData)
      .then((result) => {
        console.log(result.data);
        navigate("/users");
        alert("Product Added");
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add Products</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>

              <div className="formInput">
                <label>Name</label>
                <input
                  type="text"
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Size"
                />
              </div>
              
              <div className="formInput">
                <label>Price</label>
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                />
              </div>
              <div className="formInput">
                <label>Category</label>
                <input
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                />
              </div>
              
              <button onClick={handleAddProduct}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
