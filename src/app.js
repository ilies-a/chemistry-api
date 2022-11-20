const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const chemicalsRouter = require("./routes/chemicals.router");

const app = express();

app.use(helmet());
app.use(morgan());
app.use(express.json());

app.use("/chemicals", chemicalsRouter);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send(
      "Node.js is awesome ! Get chemical-data at this endpoint : /chemical-data"
    );
});

module.exports = app;
