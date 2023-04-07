
import { useState, useEffect } from "react";
import { getUsers } from "../../../api";

const Datatable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
          setUsers(response.data);
        });
  }, []);

  return (
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">userID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td> {user._id}</td>
              <td>
                <div className="cellWithImg">{user.firstname}</div>
              </td>
              <td>
                <div className="cellWithImg">{user.lastname}</div>
              </td>
              <td> {user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
