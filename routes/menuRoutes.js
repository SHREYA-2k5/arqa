const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require("../models/menu.model.js");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

router.get("/", async (req, res) => {
    try {
        console.log("invoking Menu.find");
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: "Server error", desc: error.message });
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

  //Gemini endpoint
router.get("/report/", async (req, res) => {
  try {
      console.log("Trying to generate report");
      console.log("GKEY ",process.env.GEMINI_KEY);
      
      // 1. First fetch all menu data
      const menuItems = await Menu.find({});
      
      console.log("Got all the data from db. Sending prompt...");
      
      if (menuItems.length === 0) {
          return res.status(404).json({ error: "No menu items found in database" });
      }

      // 2. Prepare AI prompt with the fetched data
      const prompt = `Tell me about the moon`;

      // 3. Call Gemini AI
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 4. Process and return results
      const recommendations = JSON.parse(text);
      
      res.json({
          success: true,
          totalItems: menuItems.length,
          generatedAt: new Date().toISOString(),
          recommendations: recommendations
      });

  } catch (error) {
      console.error("Report generation error:", error);
      let errorDetails = error.message;
      
      // Handle JSON parsing errors specifically
      if (error instanceof SyntaxError) {
          errorDetails = "Failed to parse AI response";
      }
      
      res.status(500).json({
          success: false,
          error: "Report generation failed",
          details: errorDetails
      });
  }
});

module.exports = router;