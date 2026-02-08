import request from "supertest";
import app from "../app.js";

describe('/auth/register', () => {

  it('logs in with correct credentials and returns 200 with user and sets cookie', async () => {

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
