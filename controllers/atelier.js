var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "soufienne",
});

const { validationResult } = require("express-validator");

const httpError = require("../models/error");

const ajout = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { matiere, date_ins, nbr_exe } = req.body;

  con.connect(function (err) {
    var sql =
      "INSERT INTO atelier (matiere, date_ins,nbr_exe) VALUES ('" +
      matiere +
      "', '" +
      date_ins +
      "', '" +
      nbr_exe +
      "')";
    con.query(sql, async (err, result) => {
      if (err) {
        res.status(400).send("Error in database operation");
      } else {
        res.status(200).json({ message: "ajouter" });
      }
    });
  });
};

const update = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { matiere, date_ins, nbr_exe } = req.body;
  const id = req.params.id;

  con.connect(function (err) {
    var sql =
      "UPDATE `atelier` SET `matiere` = '" +
      matiere +
      "', `date_ins` = '" +
      date_ins +
      "', `nbr_exe` = '" +
      nbr_exe +
      "' WHERE `atelier`.`id` = " +
      id +
      "";
    con.query(sql, async (err, result) => {
      if (err) {
        res.status(400).send("Error in database operation");
      } else {
        res.send({ message: "modification valider" });
      }
    });
  });
};

const deleteAtelier = async (req, res, next) => {
  const id = req.params.id;

  con.connect(function (err) {
    var sql = "DELETE FROM `atelier` WHERE `atelier`.`id` = '" + id + "'";
    con.query(sql, async (err, result) => {
      if (err) {
        res.status(400).send("Error in database operation");
      } else {
        res.status(200).json({ message: "suprimer" });
      }
    });
  });
};

const getAtelier = async (req, res, next) => {
  con.connect(function (err) {
   
    con.query("SELECT * FROM `atelier`", async (err, result, fields) => {
      if (err) {
        const error = new httpError("problem", 500);
        return next(error);
      }
      res.status(200).json({ atelier: result });
    });
  });
};

exports.ajout = ajout;
exports.update = update;
exports.deleteAtelier = deleteAtelier;
exports.getAtelier = getAtelier;
