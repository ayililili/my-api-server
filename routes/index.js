var express = require("express");
var router = express.Router();

// 简单的内存数据存储，用于模拟数据库
let dataStore = [];

// 获取所有项目
router.get("/", function (req, res) {
  res.json(dataStore);
});

// 根据 ID 获取特定项目
router.get("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const item = dataStore.find((i) => i.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// 新增项目
router.post("/", function (req, res) {
  const newItem = {
    id: dataStore.length + 1, // 简单地使用数组长度作为 ID
    data: req.body.data,
  };
  dataStore.push(newItem);
  res.status(201).json(newItem);
});

// // 更新项目
// router.put('/:id', function (req, res) {
//   const id = parseInt(req.params.id);
//   const item = dataStore.find(i => i.id === id);
//   if (item) {
//     item.name = req.body.name;
//     item.value = req.body.value;
//     res.json(item);
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

// // 删除项目
// router.delete('/:id', function (req, res) {
//   const id = parseInt(req.params.id);
//   const index = dataStore.findIndex(i => i.id === id);
//   if (index !== -1) {
//     const deletedItem = dataStore.splice(index, 1);
//     res.json(deletedItem);
//   } else {
//     res.status(404).json({ message: 'Item not found' });
//   }
// });

module.exports = router;
