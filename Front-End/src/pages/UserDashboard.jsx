import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css files/UserDashboard.css";
import { ContextAPI } from "../components/ContextAPI";
import PasswordUpdate from "../components/PasswordUpdate";



const UserDashboard = () => {
  const { userName, userId } = useContext(ContextAPI);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const storeRes = await axios.get("http://localhost:3000/store/getStore", {
        headers: { Authorization: `Bearer ${token}` },
      })

      setStores(storeRes.data);

      const userRatings = {};
      storeRes.data.forEach((store) => {
        const rating = store.ratings.find((r) => r.userId === userId);
        if (rating) {
          userRatings[store._id] = rating.value;
        }
      });
      setRatings(userRatings);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  const handleRating = async (storeId, value) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/store/rateStore",
        { storeId, rating: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStores((prev) =>
        prev.map((s) => (s._id === res.data._id ? res.data : s))
      );
      setRatings((prev) => ({ ...prev, [storeId]: value }));
    } catch (err) {
      console.log("Rating error:", err.message);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>Welcome, {userName} </h1>

      <section>
        <h2>Your Details</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p><strong>Name:</strong> {userName}</p>
          <PasswordUpdate />
        </div>
      </section>


      <section>
        <h2>All Stores</h2>
        {stores.map((store) => (
          <div className="store-card" key={store._id}>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p>Average Rating: {store.rating?.toFixed(1) || 0}</p>
            <label>Rate this store:</label>
        
            <select
              value={ratings[store._id] || ""}
              onChange={(e) => handleRating(store._id, parseInt(e.target.value))}
            >
              <option value="" disabled>
                Select number of stars
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

          </div>
        ))}
      </section>
    </div>
  );
};

export default UserDashboard;
