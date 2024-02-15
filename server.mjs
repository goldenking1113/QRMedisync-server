import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import patientsRoutes from "./routes/patientRoutes.mjs";
import doctorRoutes from "./routes/doctorRoutes.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/doctor", doctorRoutes);
app.use("/patients", patientsRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});