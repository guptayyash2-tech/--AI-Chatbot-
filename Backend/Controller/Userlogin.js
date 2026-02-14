const jwt = require("jsonwebtoken");
const User = require("../Mongo/Usermongo");

// Generate JWT token
const generatedtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "25d" });
};

// ================= REGISTER =================
const Userregister = async (req, res) => {
  try {
    const {name, email, password } = req.body;

    // check existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user WITHOUT hashing
    const newUser = await User.create({ name, email, password });

    const token = generatedtoken(newUser._id);

    res.json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
const Userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // check email
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare plain password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generatedtoken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Userregister, Userlogin };
