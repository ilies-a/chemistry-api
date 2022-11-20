const { Router } = require("express");

const {
  httpGetAllChemicals,
  httpGetChemicalById,
  httpAddChemical,
  httpDeleteChemical,
} = require("./chemicals.controller");

const chemicalsRouter = new Router();

chemicalsRouter.get("/", httpGetAllChemicals);
chemicalsRouter.get("/:id", httpGetChemicalById);
chemicalsRouter.post("/", httpAddChemical);
chemicalsRouter.delete("/:id", httpDeleteChemical);

module.exports = chemicalsRouter;
