    const mongoose = require("mongoose");

    const menuSchema = new mongoose.Schema({
        item: { type: String, required: true },
        desc: { type: String, required: true },
        veg: { type: Boolean, required: true },
        slot: { 
            type: String, 
            enum: ['breakfast', 'lunch', 'snack', 'dinner'], 
            required: true 
        },
        date: { type: Date, required: true },
        bookings : {type: Number, default: 0},
        ingredients: {
            type: Map,  
            of: Number, 
            default: {} 
        }
    }, { timestamps: true });

    menuSchema.virtual('id').get(function() {
        return this._id.toHexString();
    });

    menuSchema.set('toJSON', {
        virtuals: true,
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.__v;
        }
    });

    module.exports = mongoose.model("Menu", menuSchema);  