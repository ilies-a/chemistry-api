const mongoose = require("mongoose");

const chemicalsSchema = new mongoose.Schema({
  oxidant: String,
  reductant: String,
  potential: String,
});

module.exports = mongoose.model("Chemical", chemicalsSchema);
