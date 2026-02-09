import request from "supertest";
import app from "../app.js";
import userModel from "../models/user.model.js";

describe("/api/auth/login", () => {

  beforeEach(async () => {
    await userModel.deleteMany(); // keeps tests isolated
  });

  it("should register a user successfully and return 201", async () => {

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

    // ✅ status check
    expect(response.status).toBe(201);

    // ✅ response structure
    expect(response.body).toHaveProperty("user");

    // ✅ correct email returned
    expect(response.body.user.email).toBe("test@test.com");

    // ✅ confirm user saved in DB
    const user = await userModel.findOne({ email: "test@test.com" });

    expect(user).not.toBeNull();

    // ✅ password should be hashed
    expect(user.password).not.toBe("testpassword");
  });

});
