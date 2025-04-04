const express = require("express");
const router = express.Router();
const Menu = require("../models/menu.model.js");

router.get("/", async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (!menuItem) return res.status(404).json({ error: "Menu item not found" });
        res.json(menuItem);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
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

// don't really need to update a menu item
/* router.put("/:id", async (req, res) => {
    try {
        const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMenu) return res.status(404).json({ error: "Menu item not found" });
        res.json(updatedMenu);
    } catch (error) {
        res.status(400).json({ error: "Invalid update data" });
    }
});
 */

router.delete("/:id", async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenu) return res.status(404).json({ error: "Menu item not found" });
        res.json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// this endpoint whenever a user submits
router.post('/batch-bookings', async (req, res) => {
    try {
      const { updates } = req.body; 
      
      if (!Array.isArray(updates)) {
        return res.status(400).json({ error: "Updates must be an array" });
      }
  
      const bulkOps = updates.map(({ itemId, change }) => ({
        updateOne: {
          filter: { _id: itemId },
          update: { $inc: { bookings: change } } // +1 or -1
        }
      }));
  
      const result = await Menu.bulkWrite(bulkOps);
      
      res.json({
        matched: result.matchedCount,
        modified: result.modifiedCount
      });
    } catch (error) {
      res.status(500).json({ error: "Batch update failed" });
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
