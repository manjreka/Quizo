const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "hbvhdfbvhfbhvfghfgh",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using https
  })
);

// In-memory user store (replace with a database in production)
const users = [
  {
    id: 1,
    username: "teacher2",
    password: bcrypt.hashSync("Teach@456", 10),
  },
];

// Helper function to find user by username
const findUser = (username) => users.find((user) => user.username === username);

// Helper function to get user by ID
const getUserById = (id) => users.find((user) => user.id === id);

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = findUser(username);
  console.log("hello");
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.userId = user.id;
    res.json({ success: true, message: "Logged in successfully" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Middleware to check authentication and retrieve user details
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = getUserById(req.session.userId);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  next();
};

// Protected route
app.get("/protected", withAuth, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Could not log out, please try again" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
