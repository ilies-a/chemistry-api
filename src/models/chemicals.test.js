const request = require("supertest");
const app = require("../app");
const { mongoConnect } = require("../services/mongo.service");

let chemicalToDeleteId = "";

describe("Chemicals API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  test("It can get all chemicals", async () => {
    await request(app)
      .get("/chemicals")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("It can get one chemical", async () => {
    await request(app)
      .get("/chemicals/6376214712732ff4473b1c37")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("It can add one chemical", async () => {
    const newChemical = {
      oxidant: "custom oxidant",
      reductant: "custom reductant",
      potential: "custom potential",
    };
    const response = await request(app)
      .post("/chemicals")
      .send(newChemical)
      .expect("Content-Type", /json/)
      .expect(201);
    chemicalToDeleteId = JSON.parse(response.text)["newChemical"]["_id"];
  });

  test("It can delete one chemical", async () => {
    await request(app)
      .delete(`/chemicals/${chemicalToDeleteId}`)
      .send(chemicalToDeleteId)
      .expect("Content-Type", /text/)
      .expect(200);
  });
});
