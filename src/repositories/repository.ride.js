/** src/repositories/repository.ride.js */

import { execute } from "../database/sqlite.js";

async function List(passenger_user_id, pickup_date, ride_id, driver_user_id, status, status_not) {
  let filtro = [];
  let ssql = `select r.*, `;
  ssql += `u.name as passenger_name, u.phone as passenger_phone, `;
  ssql += `d.name as driver_name, d.phone as driver_phone `;
  ssql += `from rides r `;
  ssql += `join users u on (u.user_id = r.passenger_user_id) `;
  ssql += `left join users d on (d.user_id = r.driver_user_id) `;
  ssql += `where r.ride_id > 0  `

  if (passenger_user_id) {
    ssql += `and r.passenger_user_id = ? `;
    filtro.push(passenger_user_id);
  }

  if (pickup_date) {
    ssql += `and r.pickup_date = ? `;
    filtro.push(pickup_date);
  }

  if (ride_id) {
    ssql += `and r.ride_id = ? `;
    filtro.push(ride_id);
  }

  if (driver_user_id) {
    ssql += `and r.driver_user_id = ? `;
    filtro.push(driver_user_id);
  }

  if (status) {
    ssql += `and r.status = ? `;
    filtro.push(status);
  }

  if (status_not) {
    ssql += `and r.status <> ? `;
    filtro.push(status_not);
  }

  const rides = await execute(ssql, filtro)
  return rides;
}

async function Insert(passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address) {
  let dt = new Date().toISOString("pt-BR", { timeZone: "America/Sao_Paulo" }).substring(0, 10); // data e hora local
  let ssql = `insert into rides(passenger_user_id, pickup_address, `;
  ssql += `pickup_latitude, pickup_longitude, dropoff_address, pickup_date, status) `;
  ssql += `values(?, ?, ?, ?, ?, ?, 'P') returning ride_id `;
  const ride = await execute(ssql, [passenger_user_id, pickup_address, pickup_latitude, pickup_longitude, dropoff_address, dt]);
  return ride[0];
}

async function Delete(ride_id) {
  let ssql = `delete from rides where ride_id = ? `
  await execute(ssql, [ride_id])
  return {ride_id};
}

async function Finish(ride_id, passenger_user_id) {
  let ssql = `update rides set status = 'F' where ride_id = ? and passenger_user_id = ? `
  await execute(ssql, [ride_id, passenger_user_id])
  return {ride_id};
}

async function ListForDriver(driver_user_id, dt) {
  let ssql = `select r.*, u.name as passenger_name, u.phone as passenger_phone `;
  ssql += `from rides r `;
  ssql += `join users u on (u.user_id = r.passenger_user_id) `;
  ssql += `where r.pickup_date = CURRENT_DATE `;
  // ssql += `where r.pickup_date = ? `;
  ssql += `and r.driver_user_id = ? `;
  ssql += `UNION `;
  ssql += `select r.*, u.name as passenger_name, u.phone as passenger_phone `;
  ssql += `from rides r `;
  ssql += `join users u on (u.user_id = r.passenger_user_id) `;
  ssql += `where r.pickup_date = CURRENT_DATE `
  // ssql += `where r.pickup_date = ? `;
  ssql += `and r.driver_user_id is null `
  const rides = await execute(ssql, [driver_user_id]);
  return rides;
}

async function Accept(ride_id, driver_user_id) {
  let ssql = `update rides set status = 'A', driver_user_id = ? where ride_id = ? `
  await execute(ssql, [driver_user_id, ride_id])
  return {ride_id};
}

async function Cancel(ride_id) {
  let ssql = `update rides set status = 'P', driver_user_id = null where ride_id = ? `
  await execute(ssql, [ride_id])
  return {ride_id};
}

export default { List, Insert, Delete, Finish, ListForDriver, Accept, Cancel };