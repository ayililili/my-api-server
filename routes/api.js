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

  // 資料檢查
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const item = dataStore[id] || []; // Access item directly by ID as key
  res.json(item);
});

// Add a new item
router.post("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const newData = req.body.data;

  // 資料檢查
  if (!newData || typeof newData !== "object") {
    return res.status(400).json({ message: "Invalid data format" });
  }

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  // 如果資料已存在，更新；否則新增
  if (dataStore[id]) {
    dataStore[id] = {
      ...dataStore[id],
      ...newData,
    };
  } else {
    dataStore[id] = newData;
  }

  res.status(201).json({ data: dataStore[id] });
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
