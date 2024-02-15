import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const patientsRoutes = express.Router();

// Get all patients
patientsRoutes.get("/", async (req, res) => {
  let collection = await db.collection("patients");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Get a single patients by id
patientsRoutes.get("/:id", async (req, res) => {
  let collection = await db.collection("patients");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});



// Create a new patients
patientsRoutes.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    appointments: req.body.appointments.map(appointment => ({
      appointmentDate: appointment.appointmentDate,
      diseaseCategory: appointment.diseaseCategory,
      diseaseDescription: appointment.diseaseDescription,
      diseasePeriod: appointment.diseasePeriod,
      medicineName: appointment.medicineName,
      dosage: appointment.dosage,
      frequency: appointment.frequency,
      recommendation: appointment.recommendation
    }))
  };

  let collection = await db.collection("patients");
  let result = await collection.insertOne(newDocument);
  res.status(201).send(result);
});


// Update a patients by id
patientsRoutes.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updateFields = {};

  if (req.body.name) {
    updateFields.name = req.body.name;
  }
  if (req.body.age) {
    updateFields.age = req.body.age;
  }
  if (req.body.gender) {
    updateFields.gender = req.body.gender;
  }
  if (req.body.email) {
    updateFields.email = req.body.email;
  }
  if (req.body.phone) {
    updateFields.phone = req.body.phone;
  }
  if (req.body.password) {
    updateFields.password = req.body.password;
  }
  if (req.body.appointments) {
    updateFields.appointments = req.body.appointments.map(appointment => ({
      appointmentDate: appointment.appointmentDate,
      diseaseCategory: appointment.diseaseCategory,
      diseaseDescription: appointment.diseaseDescription,
      diseasePeriod: appointment.diseasePeriod,
      medicineName: appointment.medicineName,
      dosage: appointment.dosage,
      frequency: appointment.frequency,
      recommendation: appointment.recommendation
    }));
  }

  let collection = await db.collection("patients");
  let result = await collection.updateOne(query, { $set: updateFields });

  res.status(200).send(result);
});


// Delete a patients
patientsRoutes.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("patients");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});


export default patientsRoutes;
