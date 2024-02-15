import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const doctorRoutes = express.Router(); // Change 'router' to 'Router'

doctorRoutes.get("/", async (req, res) => {
  let collection = await db.collection("doctors");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

doctorRoutes.get("/:id", async (req, res) => {
  let collection = await db.collection("doctors");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

doctorRoutes.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    specification: req.body.specification,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    patientAppointments: req.body.patientAppointments.map(appointment => ({
      patientName: appointment.patientName,
      age: appointment.age,
      gender: appointment.gender,
      patientEmail: appointment.patientEmail,
      patientPhone: appointment.patientPhone,
      appointmentDate: appointment.appointmentDate,
      diseaseCategory: appointment.diseaseCategory,
      diseaseDescription: appointment.diseaseDescription,
      diseasePeriod: appointment.diseasePeriod,
      medicineName: appointment.medicineName,
      dosage: appointment.dosage,
      frequency: appointment.frequency,
      recommendation: appointment.recommendation
    })),
    patientDiagnosedHistory: req.body.patientDiagnosedHistory.map(history => ({
      patientName: history.patientName,
      age: history.age,
      gender: history.gender,
      patientEmail: history.patientEmail,
      patientPhone: history.patientPhone,
      appointmentDate: history.appointmentDate,
      diseaseCategory: history.diseaseCategory,
      diseaseDescription: history.diseaseDescription,
      diseasePeriod: history.diseasePeriod,
      medicineName: history.medicineName,
      dosage: history.dosage,
      frequency: history.frequency,
      recommendation: history.recommendation
    }))
  };
  let collection = await db.collection("doctors");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

doctorRoutes.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updateFields = {};

  if (req.body.name) {
    updateFields.name = req.body.name;
  }
  if (req.body.specification) {
    updateFields.specification = req.body.specification;
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
  if (req.body.patientAppointments) {
    updateFields.patientAppointments = req.body.patientAppointments.map(appointment => ({
      patientName: appointment.patientName,
      age: appointment.age,
      gender: appointment.gender,
      patientEmail: appointment.patientEmail,
      patientPhone: appointment.patientPhone,
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
  if (req.body.patientDiagnosedHistory) {
    updateFields.patientDiagnosedHistory = req.body.patientDiagnosedHistory.map(history => ({
      patientName: history.patientName,
      age: history.age,
      gender: history.gender,
      patientEmail: history.patientEmail,
      patientPhone: history.patientPhone,
      appointmentDate: history.appointmentDate,
      diseaseCategory: history.diseaseCategory,
      diseaseDescription: history.diseaseDescription,
      diseasePeriod: history.diseasePeriod,
      medicineName: history.medicineName,
      dosage: history.dosage,
      frequency: history.frequency,
      recommendation: history.recommendation
    }));
  }

  let collection = await db.collection("doctors");
  let result = await collection.updateOne(query, { $set: updateFields });

  res.send(result).status(200);
});


doctorRoutes.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("doctors");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});



export default doctorRoutes;
