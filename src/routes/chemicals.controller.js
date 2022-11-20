const {
  getAllChemicals,
  getChemicalById,
  addChemical,
  deleteChemicalById,
} = require("../models/chemicals.model");

const { hasValidChemicalData } = require("../utils");

async function httpGetAllChemicals(req, res) {
  try {
    const chemicals = await getAllChemicals();
    return res.status(200).json(chemicals);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Sorry, an internal server error occurred..." });
  }
}

async function httpGetChemicalById(req, res) {
  try {
    const chemical = await getChemicalById(req.params.id);
    if (!chemical) {
      return res.status(404).json({ error: "Chemical not found" });
    } else {
      return res.status(200).json(chemical);
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Sorry, an internal server error occurred..." });
  }
}

async function httpAddChemical(req, res) {
  if (!hasValidChemicalData(req.body)) {
    return res
      .status(400)
      .json({ error: "Something went wrong with your request." });
  } else {
    try {
      const newChemical = await addChemical(req.body);
      return res.status(201).json({
        message: "Success!",
        newChemical: newChemical,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Sorry, an internal server error occurred..." });
    }
  }
}

async function httpDeleteChemical(req, res) {
  try {
    const deleteResult = await deleteChemicalById(req.params.id);
    if (deleteResult) {
      return res.status(200).send("Chemical successfully deleted.");
    } else {
      return res.status(404).send("Chemical not found.");
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Sorry, an internal server error occurred..." });
  }
}

module.exports = {
  httpGetAllChemicals,
  httpGetChemicalById,
  httpAddChemical,
  httpDeleteChemical,
};
