const http = require("http");
const app = require("./app");
const { PORT } = require("./config/server.config");
const { mongoConnect } = require("./services/mongo.service");
const { handleInitialChemicalsSetting } = require("./models/chemicals.model");

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await handleInitialChemicalsSetting();
  server.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
