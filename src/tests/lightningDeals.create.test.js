const request = require("supertest");
const app = require("../app");
const { connect, disconnect } = require("../config/config");
const lightningDealModel = require("../models/lightningDealModel");

// Mock data
const mockLightningDeal = {
  name: "Test Lightning Deal",
  description: "This is a test lightning deal",
  discountPercentage: 20,
  startDate: "2023-05-01T00:00:00.000Z",
  endDate: "2023-05-02T00:00:00.000Z",
};

describe("Test Lightning Deal Creation", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await lightningDealModel.deleteMany();
    await disconnect();
  });

  it("Should create a new lightning deal", async () => {
    const res = await request(app)
      .post("/api/v1/lightningDeals")
      .send(mockLightningDeal)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual(mockLightningDeal.name);
    expect(res.body.description).toEqual(mockLightningDeal.description);
    expect(res.body.discountPercentage).toEqual(
      mockLightningDeal.discountPercentage
    );
    expect(new Date(res.body.startDate).toISOString()).toEqual(
      mockLightningDeal.startDate
    );
    expect(new Date(res.body.endDate).toISOString()).toEqual(
      mockLightningDeal.endDate
    );
  });

  it("Should not create a new lightning deal with missing required fields", async () => {
    const res = await request(app)
      .post("/api/v1/lightningDeals")
      .send({
        name: "Test Lightning Deal",
        discountPercentage: 20,
        startDate: "2023-05-01T00:00:00.000Z",
        endDate: "2023-05-02T00:00:00.000Z",
      })
      .set("Accept", "application/json");

    expect(res.status).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
});
