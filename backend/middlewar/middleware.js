const jwt = require("jsonwebtoken");

const JWT_SECRET = "QHhpZGlvCg==";

const fetchUser = (req, res, next) => {
  const token1 = req.header("auth-token");
  if (!token1) {
    res.status(400).send({ error: "access denied" });
  }
  try {
    var data = jwt.verify(token1, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
