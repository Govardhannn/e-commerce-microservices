import { jest } from "@jest/globals";
jest.mock("../config/redis.js"); // ✅ prevents real Redis

import request from "supertest";
import app from "../app.js";
import userModel from "../models/user.model.js";
import redis from "../config/redis.js";

describe("/api/auth/logout", () => {

  beforeEach(async () => {
    await userModel.deleteMany();
    jest.clearAllMocks();
  });

  it("should logout user successfully", async () => {

    // register
    await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "test@test.com",
        password: "testpassword",
        fullName: {
          firstName: "Test",
          lastName: "User"
        }
      });

    const agent = request.agent(app);

    // login
    await agent.post("/api/auth/login").send({
      email: "test@test.com",
      password: "testpassword"
    });

    // logout
    const response = await agent.post("/api/auth/logout");

    expect(response.status).toBe(200);

    expect(response.body.message)
      .toBe("Logged out seccessfully");

    // ✅ confirm blacklist happened
    expect(redis.set).toHaveBeenCalled();

    // ✅ cookie cleared
    expect(response.headers["set-cookie"][0])
      .toMatch(/token=;/);
  });

});
