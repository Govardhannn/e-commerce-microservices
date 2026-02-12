import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import agent from "../agents/agent.js";

export const initSocketServer = async (httpServer) => {
  const io = new Server(httpServer, {});

  io.use((socket, next) => {
    const cookies = socket.handshake.headers?.cookie;

    const { token } = cookies ? cookie.parse(cookies) : {};

    if (!token) {
      return next(new Error("Token not provided"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = decoded; // details regarding the useer
      socket.token = token; // Token of the user

      next();
    } catch (err) {
      console.log("Error message", err);
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    (console.log(socket.user), console.log(socket.token));

    // adding a listener  - Working -fine - step 1
    //  socket.on("message", (data)=>[     - step 2
    //   console.log('Reserved message', data)
    //  ])
    socket.on("message", async (data) => {
      // step 2.1
      const agentResponse = await agent.invoke(
        {
          messages: [
            {
              role: "user",
              content: data,
            },
          ],
        },
        {
          metadata: {
            token: socket.token,
          },
        },
      );
      
        const lastMessage =
          agentResponse.messages[agentResponse.messages.length - 1];

        console.log("AI:", lastMessage.content);

    });
    
    // socket.on("message", async (data) => {
    //    socket.on("messges of something", data)
    //   const agentResponse = await agent.invoke(
    //     {
    //       messages: [
    //         {
    //           role: "user",
    //           content: data,
    //         },
    //       ],
    //     },
    //     {
    //       metadata: {
    //         token: socket.token,
    //       },
    //     },
    //   );
    //   console.log("Agent Response:", agentResponse);
    // });
    console.log("User is connectd");
  });
};
