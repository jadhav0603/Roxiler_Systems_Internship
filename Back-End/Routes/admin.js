// routes/admin.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const RBAC_Middleware = require("../Middlewares/RBAC_Middleware");
const User = require("../Schema&Models/userSchema");
const Store = require("../Schema&Models/storeSchema");

router.get("/allData", authMiddleware, RBAC_Middleware(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    const stores = await Store.find().populate("ratings.userId", "name email role");
    res.status(200).json({ users, stores });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin data", error: err.message });
  }
});

module.exports = router;
