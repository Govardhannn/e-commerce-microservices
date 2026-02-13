import { subscribeToQueue } from "./broker.js";


export default function (){

     subscribeToQueue  ("AUTH_NOTIFICATION.USER_CREATED", async (data) => {
  console.log("Reseved the data from the Queue", data);
});


}



