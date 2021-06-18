const express = require("express");
const route = express.Router();

const userControllers = require("../controllers/user");

const { check } = require("express-validator");

route.post(
  "/signup",
  check("login").not().isEmpty(),
  check("password").isLength({ min: 8 }),
  userControllers.signup
);

route.post(
    "/login",
    check("login").not().isEmpty(),
    check("password").isLength({ min: 8 }),
    userControllers.login
  );

module.exports = route;
