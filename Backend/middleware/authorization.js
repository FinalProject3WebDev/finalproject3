const isAdmin = (req, res, next) => {
  const user = req.user; 

  if (user && user.role === "admin") {
    next(); 
  } else {
    res.status(403).json({ message: "Permission denied" }); 
  }
};

module.exports = { isAdmin };
