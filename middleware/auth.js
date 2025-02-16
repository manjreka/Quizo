const authMiddleware = (req, res, next) => {
  console.log(req.cookie);

  const userId = req.cookie.userId; // ✅ Read from cookie
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: Please log in" });
  }

  req.userId = userId; // ✅ Store it in request object for use in routes
  next();
};

module.exports = authMiddleware;
