import request from "supertest";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import app from "../app.js";
import userModel from "../models/user.model.js";
import connectDB from "../config/db.js";

describe("DELETE /api/auth/users/profile/addresses/:addressId", () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await userModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ⭐ helper (reuse this everywhere)
  async function createUserLoginAndAddAddress() {

    const password = "Secret123!";
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: "delete_user",
      email: "delete@example.com",
      password: hash,
      fullName: {
        firstName: "Delete",
        lastName: "User",
      },
      addresses: [{
        street: "MG Road",
        city: "Mumbai",
        state: "MH",
        pincode: "400001",
        country: "India",
      }],
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "delete@example.com",
        password,
      });

    const cookies = loginRes.headers["set-cookie"];

    return { user, cookies };
  }

  // ===============================
  // ✅ SUCCESS DELETE
  // ===============================

  it("should delete user address successfully", async () => {

    const { user, cookies } =
      await createUserLoginAndAddAddress();

    const addressId =
      user.addresses[0]._id.toString();

    const res = await request(app)
      .delete(`/api/auth/users/profile/addresses/${addressId}`)
      .set("Cookie", cookies);

    expect(res.status).toBe(200);

    expect(res.body.message)
      .toBe("Address deleted successfully");

    expect(res.body.address.length).toBe(0);

    // confirm DB update
    const updatedUser = await userModel.findById(user._id);

    expect(updatedUser.addresses.length).toBe(0);
  });

  // ===============================
  // ✅ UNAUTHORIZED
  // ===============================

  it("should return 401 if not authenticated", async () => {

    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/auth/users/profile/addresses/${fakeId}`);

    expect(res.status).toBe(401);
  });

  // ===============================
  // ✅ ADDRESS NOT FOUND
  // ===============================

  it("should still return 200 if address does not exist (idempotent delete)", async () => {

    const { cookies } =
      await createUserLoginAndAddAddress();

    const fakeId =
      new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/auth/users/profile/addresses/${fakeId}`)
      .set("Cookie", cookies);

    // your controller returns 200
    expect(res.status).toBe(200);
  });

  // ===============================
  // ✅ USER NOT FOUND
  // ===============================

  it("should return 404 if user does not exist", async () => {

    const password = "Secret123!";
    const hash = await bcrypt.hash(password, 10);

    // create user → login → delete user
    const user = await userModel.create({
      username: "temp",
      email: "temp@example.com",
      password: hash,
      fullName: { firstName: "Temp", lastName: "User" }
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "temp@example.com",
        password,
      });

    const cookies = loginRes.headers["set-cookie"];

    // delete user manually
    await userModel.findByIdAndDelete(user._id);

    const fakeAddress =
      new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/auth/users/profile/addresses/${fakeAddress}`)
      .set("Cookie", cookies);

    expect(res.status).toBe(404);
  });

});
