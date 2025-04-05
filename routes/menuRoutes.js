const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require("../models/menu.model.js");

router.get("/", async (req, res) => {
    try {
        console.log("invoking Menu.find");
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: "Server error", desc: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ error: "Menu item not found" });
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ error: "Server error",desc:error });
    }
});

router.post("/", async (req, res) => {
    try {
        const { item, desc, veg, slot, date } = req.body;
        const newMenu = new Menu({ item, desc, veg, slot, date });
        await newMenu.save();
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(400).json({ error: "Invalid data" });
    }
});

// PATCH sends over users booking
router.patch('/book', async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Items must be an array" });
    }

    // Atomic $inc updates (no transaction needed)
    const bulkOps = items.map(item => ({
      updateOne: {
        filter: { _id: item.itemId },
        update: { $inc: { bookings: item.portions } }
      }
    }));
    const result = await Menu.bulkWrite(bulkOps);
    res.json({
      success: true,
      updatedCount: result.modifiedCount
    });

  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({
      success: false,
      error: "Update failed",
      details: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) return res.status(404).json({ error: "Menu item not found" });
        res.json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// For bulk posting my data cause im lazy lol
router.post('/bulk', async (req, res) => {
    try {
      const items = req.body;
      const result = await Menu.insertMany(items);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

module.exports = router;
