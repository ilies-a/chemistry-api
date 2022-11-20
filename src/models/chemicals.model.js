const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const chemicalsModel = require("./chemicals.mongo");

const CHEMICAL_RESPONSE_KEYS = {
  _id: 1,
  oxidant: 1,
  potential: 1,
  reductant: 1,
};

async function handleInitialChemicalsSetting() {
  if (!(await initialChemicalsAreSet())) {
    console.log("Setting initial chemicals...");
    setInitialChemicals();
  }
}

async function initialChemicalsAreSet() {
  const queryRes = await chemicalsModel.find({});
  return queryRes.length > 0;
}

async function setInitialChemicals() {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(
      path.join(__dirname, "..", "..", "csv", "electromotive_potentials.csv")
    );
    stream
      .pipe(
        parse({
          columns: true,
        })
      )
      .on("data", async (data) => {
        stream.pause();
        await addChemical(data);
        stream.resume();
      })
      .on("end", () => {
        console.log("Setting initial chemicals done.");
        resolve();
      });
  });
}

async function getAllChemicals() {
  return await chemicalsModel.find({}, CHEMICAL_RESPONSE_KEYS);
}

async function getChemicalById(id) {
  return await chemicalsModel.findOne({ _id: id }, CHEMICAL_RESPONSE_KEYS);
}

async function addChemical(chemical) {
  const queryRes = await chemicalsModel.findOneAndUpdate(chemical, chemical, {
    upsert: true,
    returnOriginal: false,
  });
  const { _id, oxidant, potential, reductant } = queryRes;
  return {
    _id,
    oxidant,
    potential,
    reductant
  }
}

async function deleteChemicalById(id) {
  return (await chemicalsModel.deleteOne({ _id: id })).deletedCount == 1
    ? true
    : false;
}

module.exports = {
  handleInitialChemicalsSetting,
  getAllChemicals,
  getChemicalById,
  addChemical,
  deleteChemicalById,
};
