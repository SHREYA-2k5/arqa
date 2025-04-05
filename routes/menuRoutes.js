const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require("../models/menu.model.js");
const dotenv = require("dotenv");
dotenv.config({ path: './.env.local' });

const { GoogleGenerativeAI } = require("@google/generative-ai");
console.log("GEMINI_KEY", process.env.GEMINI_KEY);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

//get all menu items
router.get("/", async (req, res) => {
    try {
        console.log("invoking Menu.find");
        const menuItems = await Menu.find();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: "Server error", desc: error.message });
    }
});

//add menu
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

//delete by ID
router.delete("/:id", async (req, res) => {
  try {
      console.log("Deleting on ", req.params.id);
      const objectId = new mongoose.Types.ObjectId(req.params.id);
      const deletedMenu = await Menu.findByIdAndDelete(objectId);
      if (!deletedMenu) {
          return res.status(404).json({ 
              success: false,
              message: "Menu item not found" 
          });
      }
      res.json({ 
          success: true,
          message: "Menu item deleted successfully",
          deletedId: deletedMenu._id
      });
  } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ 
          success: false,
          message: "Server error during deletion",
          error: error.message 
      });
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
router.get("/report", async (req, res) => {
  try {
      const menuItems = await Menu.find({});
      if (menuItems.length === 0) {
          return res.status(404).json({ error: "No menu items found" });
      }

      // 1. Define the expected JSON schema
      const responseSchema = {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            id: { 
              type: 'STRING',
              description: 'MongoDB ID of the menu item'
            },
            title: {
              type: 'STRING',
              description: 'Short descriptive title of analysis',
              maxLength: 60
            },
            text: {
              type: 'STRING',
              description: 'Detailed analysis of the menu item'
            }
          },
          required: ['id', 'title', 'text']
        }
      };

      // 2. Call Gemini with explicit JSON schema
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [{
            text: `Analyze these menu items and provide recommendations: ${JSON.stringify(menuItems.slice(0, 3))}`
          }]
        }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: responseSchema
        }
      });

      // 3. Get structured JSON response
      const response = await result.response;
      const jsonResponse = JSON.parse(response.text());
      
      res.json({
          success: true,
          data: jsonResponse,
          generatedAt: new Date().toISOString()
      });

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
          success: false,
          error: error.message
      });
  }
});


//For donate stuff



module.exports = router;