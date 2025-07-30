import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Api = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('https://randomuser.me/api/?results=5')
      .then((res) => {
        console.log(res.data.results);
        setUsers(res.data.results);
        setError(false);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setError(true);
      });
  }, []);

  return (
    <div style={{ color: "white", height: "100vh", width: "100vw", background: "#111", padding: "1rem" }}>
      {error ? (
        <div>❌ Failed to fetch users.</div>
      ) : users.length > 0 ? (
        <div>
          <h2>👥 Random Users</h2>
          {users.map((user, index) => (
            <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #555" }}>
              <p><strong>Name:</strong> {user.name.first} {user.name.last}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <img src={user.picture.medium} alt="User" />
            </div>
          ))}
        </div>
      ) : (
        <div>⏳ Loading...</div>
      )}
    </div>
  );
};

export default Api;
