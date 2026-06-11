
const jwt = require("jsonwebtoken");

const Authentication  = (req, res, next) => {
try {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(401).json({ success: false, message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET || "SECRET123", (err, decoded) => {
    if (err)
      return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = decoded;
    next();
  });
} catch (error) {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    details: error.message,
    });
}
};

module.exports = Authentication;