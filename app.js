const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// 引入路由
const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");
const ipWhitelistMiddleware = require("./middleware/ipWhitelistMiddleware"); // 引入白名單中間件

const app = express();

// 啟用 CORS 支援
app.use(cors());

// 設置視圖目錄和模板引擎為 Pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 中間件設置
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 使用 IP 白名單檢測中間件
app.use("/api", ipWhitelistMiddleware);

// 使用路由
app.use("/", indexRouter);
app.use("/api", apiRouter);

// 處理 404 錯誤
app.use((req, res, next) => {
  next(createError(404));
});

// 處理通用錯誤
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// 導出應用
module.exports = app;
