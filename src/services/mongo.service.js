const mongoose = require("mongoose");
const { MONGO_URL } = require("../config/mongo.config");

mongoose.connection.once("open", () => {
  console.log("MongoDB connection success");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
  mongoConnect,
};
