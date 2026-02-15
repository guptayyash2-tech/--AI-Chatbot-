const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Mongo/Usermongo");

const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "25d",
  });
};

// ================= REGISTER =================
const Userregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id); // FIXED

    res.status(201).json({
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
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id); // FIXED

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Userregister, Userlogin };
