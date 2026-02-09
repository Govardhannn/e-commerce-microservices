import request from "supertest";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import app from "../app.js";
import userModel from "../models/user.model.js";
import connectDB from "../config/db.js";

describe("POST /api/auth/users/me/addresses", () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await userModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // ✅ helper function (VERY GOOD practice)
  async function createUserAndLogin() {

    const password = "Secret123!";
    const hash = await bcrypt.hash(password, 10);

    await userModel.create({
      username: "addr_user",
      email: "addr@example.com",
      password: hash,
      fullName: {
        firstName: "Addr",
        lastName: "User",
      },
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "addr@example.com",
        password,
      });

    expect(loginRes.status).toBe(200);

    return loginRes.headers["set-cookie"];
  }

  // ===============================
  // ✅ SUCCESS CASE
  // ===============================

  it("should add a new address successfully", async () => {

    const cookies = await createUserAndLogin();

    const res = await request(app)
      .post("/api/auth/users/me/addresses")
      .set("Cookie", cookies)
      .send({
        street: "MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
        isDefault: true,
      });

    expect(res.status).toBe(201);

    expect(res.body.message)
      .toBe("Address added successfully");

    expect(res.body.address).toBeDefined();

    expect(res.body.address.street)
      .toBe("MG Road");

    // confirm saved in DB
    const user = await userModel.findOne({
      email: "addr@example.com",
    });

    expect(user.addresses.length).toBe(1);
  });

  // ===============================
  // ✅ AUTH REQUIRED
  // ===============================

  it("should return 401 if user is not authenticated", async () => {

    const res = await request(app)
      .post("/api/auth/users/me/addresses")
      .send({
        street: "MG Road",
        city: "Mumbai",
        state: "MH",
        pincode: "400001",
        country: "India",
      });

    expect(res.status).toBe(401);
  });

  // ===============================
  // ✅ VALIDATION TEST
  // ===============================

  it("should fail if pincode is invalid", async () => {

    const cookies = await createUserAndLogin();

    const res = await request(app)
      .post("/api/auth/users/me/addresses")
      .set("Cookie", cookies)
      .send({
        street: "MG Road",
        city: "Mumbai",
        state: "MH",
        pincode: "12", // ❌ invalid
        country: "India",
      });

    expect(res.status).toBe(400);

    expect(res.body.errors || res.body.message)
      .toBeDefined();
  });

  // ===============================
  // ✅ OPTIONAL FIELD TEST
  // ===============================

  it("should add address even without isDefault", async () => {

    const cookies = await createUserAndLogin();

    const res = await request(app)
      .post("/api/auth/users/me/addresses")
      .set("Cookie", cookies)
      .send({
        street: "Linking Road",
        city: "Mumbai",
        state: "MH",
        pincode: "400050",
        country: "India",
      });

    expect(res.status).toBe(201);
    expect(res.body.address).toBeDefined();
  });

});
