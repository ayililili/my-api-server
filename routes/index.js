var express = require("express");
var router = express.Router();

// Simple in-memory data storage, simulating a database
let dataStore = {};

// Get all items
router.get("/", function (req, res) {
  res.json(dataStore);
});

// Get a specific item by ID
router.get("/1", function (req, res) {
  const item = dataStore[1]; // Access item directly by ID as key
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

router.get("/2", function (req, res) {
  const item = dataStore[2]; // Access item directly by ID as key
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

router.get("/3", function (req, res) {
  const item = dataStore[3]; // Access item directly by ID as key
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Add a new item
router.post("/1", function (req, res) {
  const newData = req.body.data;

  // 如果資料已存在，更新；否則新增
  if (dataStore[1]) {
    dataStore[1] = {
      ...dataStore[1], // 保留原本資料
      ...newData, // 更新新資料
    };
  } else {
    dataStore[1] = newData;
  }

  res.status(201).json({ data: dataStore[1] });
});

router.post("/2", function (req, res) {
  const newData = req.body.data;

  // 如果資料已存在，更新；否則新增
  if (dataStore[2]) {
    dataStore[2] = {
      ...dataStore[2], // 保留原本資料
      ...newData, // 更新新資料
    };
  } else {
    dataStore[2] = newData;
  }

  res.status(201).json({ data: dataStore[2] });
});

router.post("/3", function (req, res) {
  const newData = req.body.data;

  // 如果資料已存在，更新；否則新增
  if (dataStore[3]) {
    dataStore[3] = {
      ...dataStore[3], // 保留原本資料
      ...newData, // 更新新資料
    };
  } else {
    dataStore[3] = newData;
  }

  res.status(201).json({ data: dataStore[3] });
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
