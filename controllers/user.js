var mysql = require("mysql");
const jwt = require("jsonwebtoken");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "soufienne",
});

const { validationResult } = require("express-validator");

const httpError = require("../models/error");

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { login, password } = req.body;
  console.log(login, password);

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql =
      "INSERT INTO user (login, password) VALUES ('" +
      login +
      "', '" +
      password +
      "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

  res.status(201).json({ userId: "success" });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { login, password } = req.body;

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM `user` WHERE user.login = '" + login + "'",
      async (err, result, fields) => {
        if (err) throw err;
        if (!result || result[0].password !== password) {
          return next(new httpError("invalid input passed ", 422));
        }

        let token;
        try {
          token = jwt.sign(
            { userId: result[0].id, login: result[0].login },
            "secret-thinks",
            { expiresIn: "1h" }
          );
        } catch (err) {
          const error = new httpError("failed signup try again later", 500);
          return next(error);
        }

        res.send({user:result[0],token:token});
      }
    );
  });


};

exports.signup = signup;
exports.login = login;
