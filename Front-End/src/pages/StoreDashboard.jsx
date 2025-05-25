import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css files/StoreDashboard.css";
import PasswordUpdate from '../components/PasswordUpdate'
import { ContextAPI } from "../components/ContextAPI";
import { storeData } from "../functions/storeData";



const StoreDashboard = () => {
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(false);
  
  
  const {store, setStore,userName} = useContext(ContextAPI);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await storeData()
        setStore(data);
        
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchData()
    
  }, []);

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/store/addStore",
        {
          storeName,
          address,
        }
      );

      console.log(response.data);

      setStore((prev) => [...prev, response.data]);
    } catch (error) {
      console.log({ addStore_error: error.message });
    }

    setStoreName("");
    setAddress("");
    setAddFormVisible(false);
  };

  const handleAddStoreForm = () => {
    setAddFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/store/deleteStore/${id}`);
      setStore((prev) => prev.filter((store) => store._id !== id));
    } catch (error) {
      console.log({ deleteStore_error: error.message });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">WELCOME, {userName}</h1>
      <PasswordUpdate />

      <button className="add-store-btn" onClick={() => handleAddStoreForm()}>
        ADD STORE
      </button>
      {addFormVisible ? (
        <div className="store-form">
          <FontAwesomeIcon
            className="close-icon"
            icon={faXmark}
            onClick={() => setAddFormVisible(false)}
          />
          <form onSubmit={handleAddStore}>
            <label>Store Name</label> <br />
            <input
              type="text"
              name="name"
              value={storeName}
              required
              onChange={(e) => setStoreName(e.target.value)}
            />
            <br />
            <label> Address</label>
            <br />
            <input
              type="text"
              name="address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <br />
            <button type="submit">ADD</button>
          </form>
        </div>
      ) : (
        ""
      )}

      <div>
        {store.map((ele, i) => (
          <div className="store-card" key={ele._id}>
            <FontAwesomeIcon icon={faShop} />
            <h4>{ele.name}</h4>
            <p>{ele.address}</p>
            <p>{ele.rating}</p>

            <button onClick={() => setEditIndex(i)}>Edit</button>
            <button onClick={() => handleDelete(ele._id)}>Delete</button>

            {editIndex === i && (
              <div className="edit-form">
                <FontAwesomeIcon
                  className="close-icon"
                  icon={faXmark}
                  onClick={() => setEditIndex(null)}
                />
                <form>
                  <label>Store Name</label>
                  <input type="text" defaultValue={ele.name} required />
                  <br />
                  <label>Address</label>
                  <input type="text" defaultValue={ele.address} required />
                  <br />
                  <button type="submit">EDIT</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreDashboard;
