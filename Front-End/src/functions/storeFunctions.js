// --- src/functions/storeFunctions.js ---
import axios from "axios";

const API = "http://localhost:3000";

export const fetchStores = async (token) => {
  const res = await axios.get(`${API}/store/allStores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addStore = async (storeName, address, token) => {
  const res = await axios.post(
    `${API}/store/addStore`,
    { storeName, address },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const updateStore = async (id, name, address, token) => {
  const res = await axios.patch(
    `${API}/store/updateStore/${id}`,
    { name, address },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteStore = async (id, token) => {
  await axios.delete(`${API}/store/deleteStore/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const rateStore = async (storeId, rating, token) => {
  const res = await axios.post(
    `${API}/store/rateStore`,
    { storeId, rating },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const fetchUsers = async (token) => {
  const res = await axios.get(`${API}/user/allUsers`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
