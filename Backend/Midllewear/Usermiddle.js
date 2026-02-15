const jwt = require("jsonwebtoken");
const User = require("../Mongo/Usermongo");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // attach user
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalid" });
    }
  }

  return res.status(401).json({ message: "No token" });
};

module.exports = protect;
