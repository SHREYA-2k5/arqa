const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    role: String,
    bookings: { type: Number, default: 0 },
    points: { type: Number, default: 0 } 
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
