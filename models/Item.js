const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  token: {
    type: String,
  },
  itemId: {
    type: Number,
    required: true,
    unique: true,
  },
  upc: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: "",
  },
  featureA: {
    type: String,
    default: "",
  },
  featureValueA: {
    type: String,
    default: "",
  },
  featureB: {
    type: String,
    default: "",
  },
  featureValueB: {
    type: String,
    default: "",
  },
  onHand: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  tax1: {
    type: Number,
    default: 0,
  },
  tax2: {
    type: Number,
    default: 0,
  },
  dateTimeCreated: {
    type: Number,
    default: new Date().getTime(),
  },
  dateTimeModified: {
    type: Number,
    default: new Date().getTime(),
  },
  enable: {
    type: Boolean,
    default: true,
  },
  client: {
    type: String,
    default: "",
  },
});

module.exports = Item = mongoose.model("Item", itemSchema);
