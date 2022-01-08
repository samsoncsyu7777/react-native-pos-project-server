const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const {
  createItem,
  getItem,
} = require("../controllers/item");

router.route("/v1/create").post(protect, createItem);

router.route("/v1/get-upc/:upc").get(protect, getItem);

module.exports = router;
