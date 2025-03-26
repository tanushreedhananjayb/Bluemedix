import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getAllUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
