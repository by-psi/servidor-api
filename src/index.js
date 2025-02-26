/** src/index.js */

import express from "express";
import cors from "cors";
import controllerRide from "./controllers/controller.ride.js";

const app = express();
const PORT = 3001;

// Middlewares

app.use(express.json());
app.use(cors());

// Routes

app.get("/rides/list", controllerRide.List);
app.post("/rides/insert", controllerRide.Insert);
app.delete("/rides/delete/:ride_id", controllerRide.Delete);
app.put("/rides/finish/:ride_id", controllerRide.Finish);
app.get("/rides/list_for_driver", controllerRide.ListForDriver);
app.get("/rides/details/:ride_id", controllerRide.ListDetails);
app.put("/rides/accept/:ride_id", controllerRide.Accept);
app.put("/rides/cancel/:ride_id", controllerRide.Cancel);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});
