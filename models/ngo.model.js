const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizationSchema = new Schema({
  organizationName: { type: String, required: true },
  email: { type: String, lowercase: true },
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  registrationNumber: String,
  organizationType: {
    type: String,
    enum: ["Charitable Trust", "Society", "Non-Profit Company", "Religious Organization", "Educational Institution", "Other"],
    required: true
  },
}, { timestamps: true });

organizationSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

organizationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Organization', organizationSchema);