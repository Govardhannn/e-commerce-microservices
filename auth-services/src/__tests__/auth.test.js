import request from "supertest";
import app from "../app.js";

describe('/auth/register', () => {

  it('should register a user successfully', async () => {

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@test.com',
        password: 'testpassword',
        fullName: {
          firstName: "Test",
          lastName: "User"
        }
      });

    expect(response.status).toBe(201);
  });

});
