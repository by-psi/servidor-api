import express from "express";
import cors from "cors";
import controllerRide from "./controllers/controller.ride.js";

const app = express();
const PORT = 3001;

// Middlewares

app.use(express.json());
app.use(cors());

// Routes

app.get("/rides", controllerRide.List);
app.post("/rides", controllerRide.Insert);
app.delete("/rides/:ride_id", controllerRide.Delete);
app.put("/rides/:ride_id/finish", controllerRide.Finish);
app.get("/rides/drivers/:driver_user_id", controllerRide.ListForDriver);
app.get("/rides/:ride_id", controllerRide.ListDetails);
app.put("/rides/:ride_id/accept", controllerRide.Accept);
app.put("/rides/:ride_id/cancel", controllerRide.Cancel);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});
