const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");
const util = require('util');

// @route POST /item/v1/create
// @desc Create Item
// @access Protect
exports.createItem = asyncHandler(async (req, res, next) => {
  const item = await Item.create(req.body);

  if (item) {
    res.status(201).json({
      item: item
    });
  } else {
    res.status(400);
    throw new Error("Invalid item data");
  }
});

// @route GET /item/v1/get-upc/:id
// @desc Create Item
// @access Protect
exports.getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.find({ upc: req.params.upc.toString() });

  if (item) {
    res.status(201).json({
      content: item,
    });
  } else {
    res.status(400);
    throw new Error("Invalid upc");
  }
});
