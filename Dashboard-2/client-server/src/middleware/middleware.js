const jwt = require("jsonwebtoken");

const isConnect = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized request" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    try {
      const decoded = jwt.verify(token, "secret-key");
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };

module.exports = {
    isConnect
}