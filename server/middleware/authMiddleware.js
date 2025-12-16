const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing",
      });
    }

    // Verify token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
