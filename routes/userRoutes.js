const express = require("express");
const User = require("../models/users.model.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users", desc: error });
    }
});

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
            return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user with id " + req.params.id });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const updates = req.body;
            
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updates,
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ 
            error: "Error updating user",
            details: error.message 
        });
    }
});

module.exports = router;