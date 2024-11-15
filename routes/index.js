var express = require("express");
var router = express.Router();

// Simple in-memory data storage, simulating a database
let dataStore = {};

// Get all items
router.get("/", function (req, res) {
  res.json(dataStore);
});

// Get a specific item by ID
router.get("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const item = dataStore[id]; // Access item directly by ID as key
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Add a new item
router.post("/", function (req, res) {
  const id = req.body.id;
  const data = req.body.data;

  // Add item to dataStore with ID as key
  dataStore[id] = data;
  res.status(201).json({ id, data });
});

// Update an item
router.put("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const item = dataStore[id];

  if (item) {
    item.data = req.body.data; // Update the `data` field as needed
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Delete an item
router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  if (dataStore[id]) {
    const deletedItem = dataStore[id];
    delete dataStore[id];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

module.exports = router;
