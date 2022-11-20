function hasValidChemicalData(object) {
  for (let key in object) {
    if (
      !(key === "oxidant" && typeof object[key] === "string") &&
      !(key === "reductant" && typeof object[key] === "string") &&
      !(key === "potential" && typeof object[key] === "string")
    ) {
      return false;
    }
  }
  return true;
}

module.exports = {
  hasValidChemicalData,
};
