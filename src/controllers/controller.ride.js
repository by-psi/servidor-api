/** src/controllers/controller.ride.js */

import serviceRide from "../services/service.ride.js";

async function List(req, res) {
  try {
    const { passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not } = req.query;
    const rides = await serviceRide.List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function Insert(req, res) {
  try {
    const { passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address } = req.body;
    const ride = await serviceRide.Insert( passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address );
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function Delete(req, res) {
  try {
    const ride_id = req.params.ride_id;
    const ride = await serviceRide.Delete(ride_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function Finish(req, res) {
  try {
    const ride_id = req.params.ride_id;
    const passenger_user_id = req.body.passenger_user_id;
    const ride = await serviceRide.Finish(ride_id, passenger_user_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function ListForDriver(req, res) {
  try {
    const driver_user_id = req.query.driver_user_id;  // Acessando os parâmetros via query
    const dt = req.query.dt;  // Acessando a data via query
    const rides = await serviceRide.ListForDriver(driver_user_id, dt);
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function ListDetails(req, res) {
  try {
    const ride_id = req.params.ride_id;
    const rides = await serviceRide.List(null, null, ride_id, null, null);
    res.status(200).json(rides[0]);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function Accept(req, res) {
  try {
    const ride_id = req.params.ride_id;
    const driver_user_id = req.body.driver_user_id;
    const ride = await serviceRide.Accept(ride_id, driver_user_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({error});
  }
}

async function Cancel(req, res) {
  try {
    const ride_id = req.params.ride_id;
    const ride = await serviceRide.Cancel(ride_id);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({error});
  }
}

export default { List, Insert, Delete, Finish, ListForDriver, ListDetails, Accept, Cancel };