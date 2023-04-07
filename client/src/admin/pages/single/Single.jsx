import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Single = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.Id}`);
    result = await result.json();
    console.warn(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setImage(result.image);
  };

  // const handleUpdate = async (e) =>{
  //   e.preventDefault()
  //  console.warn(name,price,category,image)
  //  const formData = new FormData()
  //  formData.append('name',name)
  //  formData.append('price',price)
  //  formData.append('category',category)
  //  formData.append('image', image)
  //  let result = await fetch(`http://localhost:5000/product/${params.Id}`,{
  //   method:'Put',
  //   body:(formData),
  //   headers:{
  //       'Content-Type':"application/json"
  //   }
  // });
  // result= await result.json()
  // console.warn(result)

  // }

  const handleUpdate = () => {
    console.log({ name, price, category, image });
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    axios
      .put(`http://localhost:5000/product/${params.Id}`, formData)
      .then((result) => {
        console.log(result.data);
        // navigate('/users')
        alert("Product Updated");
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleUpdate}>
              Edit
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <label htmlFor="file">
                <img
                  src={`http://localhost:5000/${image}`}
                  alt=""
                  className="itemImg"
                />
              </label>
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Image:</span>
                  <span className="itemValue">
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setImage(e.target.files[0])}
                      id="file"
                    ></input>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
