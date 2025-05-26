const express = require('express');
const router = express.Router();
const Store = require('../Schema&Models/storeSchema');
const authMiddleware = require('../Middlewares/authMiddleware');
const RBAC_Middleware = require('../Middlewares/RBAC_Middleware');


router.get('/getStore', authMiddleware , async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




router.post('/addStore' ,authMiddleware, RBAC_Middleware(["admin","store manager"]),async (req, res) => {
    const { storeName, address } = req.body;

    try {
        if (!storeName || !address) {
            return res.status(400).json({ message: 'Store name and address are required' });
        }


        const newStore = new Store({
            name: storeName,
            address
        });

        const savedStore = await newStore.save();
        res.status(201).json(savedStore);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.patch('/updateStore/:id',authMiddleware, RBAC_Middleware(["admin","store manager"]), async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const updatedStore = await Store.findByIdAndUpdate(
      id,
      { name, address },
      { new: true } 
    );

    if (!updatedStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});






router.delete('/deleteStore/:id', authMiddleware, RBAC_Middleware(["admin","store manager"]), async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
