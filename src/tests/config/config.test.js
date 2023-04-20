const request = require("supertest");
const app = require("../../index");

describe("Configuration Tests", () => {
  describe("GET /config", () => {
    it("returns a JSON object with application configuration", async () => {
      const res = await request(app).get("/config");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        db_uri: process.env.DB_URI,
        jwt_secret: process.env.JWT_SECRET,
      });
    });
  });
});
