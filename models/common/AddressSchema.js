// AddressSchema.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema design for address
const AddressSchema = new Schema({
  firstLine: {
    type: String,
    required: true
  },
  secondLine: {
    type: String,
    required: true
  },
  townCity: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  isBilling: Boolean,
  isDelivery: Boolean
});

// export model
module.exports = AddressSchema;
