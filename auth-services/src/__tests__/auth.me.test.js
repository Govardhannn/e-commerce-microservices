import request from "supertest";
import app from "../app.js";
import userModel from "../models/user.model.js";

describe("/api/auth/register", () => {

  beforeEach(async () => {
    // keep tests isolated
    await userModel.deleteMany();
  });

  it("registers a user successfully and returns 201", async () => {

    const response = await request(app)
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

    // ✅ status
    expect(response.status).toBe(201);

    // ✅ response body
    expect(response.body).toHaveProperty("user");

    expect(response.body.user.email).toBe("test@test.com");

    // ✅ user saved in DB
    const userInDb = await userModel.findOne({ email: "test@test.com" });

    expect(userInDb).not.toBeNull();

    // ✅ password should be hashed
    expect(userInDb.password).not.toBe("testpassword");
  });

});
