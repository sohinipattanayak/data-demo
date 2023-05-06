import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net";

function UserList() {
  const [users, setUsers] = useState([]);
  console.log("Hi");
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUsers(response.data);
        console.log("from userlist ===> ", response.data);
        $(document).ready(() => {
          $("#usersTable").DataTable();
        });
      } catch (err) {
        console.log(err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <table id="usersTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
