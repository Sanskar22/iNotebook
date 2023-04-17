const express = require("express");
const User = require("../models/User");
const fetchUser = require("../middlewar/middleware");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = "QHhpZGlvCg==";

// create a user

router.post(
  "/createUser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "passowrd must be atleast 5 chracters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = "false"
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // chaeck weather the user with same email exist

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .send({ errors: "sorry a user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });


    const data = {
      user: {
        id: user.id,
      },
    };
    var token = jwt.sign(data, JWT_SECRET);
    success = "true";
    res.json({ success, token });
  }
);

// authenticate a user
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "passowrd cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = "false";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {

        return res
          .status(400)
          .json({ error: "please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {

        return res
          .status(400)
          .json({ error: "please login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      var token = jwt.sign(data, JWT_SECRET);
      success = "true";
      res.json({ success, token });

    } catch (error) {
      res.status(500).send("some error occured");
    }
  }
);

// Get login user detail

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "some error occured" });
  }
});

module.exports = router;
