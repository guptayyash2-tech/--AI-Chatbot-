const jwt =  require("jsonwebtoken");
const User = require("../Mongo/Usermongo");


const adminprotect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await User.findById(decoded.id).select("-password");
      if (!req.admin) return res.status(404).json({ message: "User not found" });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token invalid" });
    }
  }

  if (!token) return res.status(401).json({ message: "No token" });
};

module.exports = adminprotect;
