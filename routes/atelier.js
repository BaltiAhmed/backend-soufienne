const express = require("express");
const route = express.Router();

const atelierController = require("../controllers/atelier");

const { check } = require("express-validator");

route.post(
  "/ajout",
  check("matiere").not().isEmpty(),
  check("date_ins").not().isEmpty(),
  check("nbr_exe").not().isEmpty(),
  
  atelierController.ajout
);

route.patch(
  "/:id",
  check("matiere").not().isEmpty(),
  check("date_ins").not().isEmpty(),
  check("nbr_exe").not().isEmpty(),
  
  atelierController.update
);

route.delete('/:id',atelierController.deleteAtelier)
route.get('/',atelierController.getAtelier)



module.exports = route;
