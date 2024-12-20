// 定義允許的 IP 白名單
const allowedIPs = [
  "::1",
  "1.34.210.47",
  "61.220.175.151",
  "61.220.175.152",
  "61.220.175.153",
  "61.220.175.229",
  "61.220.175.230",
  "61.220.175.231",
];

// IP 白名單檢測中間件
const ipWhitelistMiddleware = (req, res, next) => {
  const clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;
  console.log(clientIP);
  if (allowedIPs.includes(clientIP)) {
    return next(); // 如果 IP 在白名單中，允許訪問
  }

  // 如果 IP 不在白名單中，返回 JSON 格式的 403 響應
  res.status(403).json({
    success: false,
    message: `你的 IP 地址 (${clientIP}) 未被允許訪問此服務器。`,
  });
};

module.exports = ipWhitelistMiddleware;
