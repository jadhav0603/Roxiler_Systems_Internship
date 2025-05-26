import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ContextAPI } from "../components/ContextAPI";
import "../css files/AdminDashboard.css";
import PasswordUpdate from "../components/PasswordUpdate";

const AdminDashboard = () => {
  const { userName } = useContext(ContextAPI);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [userDetails, setUserDetails] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const res = await axios.get("http://localhost:3000/admin/allData", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
        setStores(res.data.stores);

        console.log(res.data.stores)
      } catch (error) {
        console.error("Admin fetch error:", error.message);
      }
    }

    fetchAdminData();
  }, []);


  return (
    <div className="admin-dashboard">
      <h1>Welcome Admin, {userName}</h1>
      <PasswordUpdate />

      <section>
        <h2>All Users ({users.length})</h2>
        <u
          style={{ cursor: "pointer" }}
          onClick={() => setUserDetails(!userDetails)}
        >
          View Users
        </u>
        {userDetails ? (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user.name} - {user.email} ({user.role})
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </section>

      <section>
        <h2>All Stores ({stores.length})</h2>

        {stores.map((store) => (
          <div key={store._id} className="store-card">
            <h3>{store.name}</h3>
            <p>Address: {store.address}</p>
            <p>Avg Rating: {store.rating?.toFixed(1) || 0}</p>
            <p>
              <strong>Ratings:</strong>
            </p>
            <ul>
              {store.ratings.map((r) => (
                <p key={r._id}>
                  Rated by: <strong>{r.userId?.name || "Unknown"}</strong> — ⭐{" "}
                  {r.value}
                </p>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard;
