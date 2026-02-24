import app from "./src/app.js";
import { productDB } from "./src/config/db.js";

const port = process.env.PORT || 8000;
import { connect } from "./src/broker/broker.js";



const connctionSting = async () => {
  await connect();
  await productDB();
  app.listen(port, () => {
    console.log(`product server is running ${port}`);
  });
};

connctionSting();
