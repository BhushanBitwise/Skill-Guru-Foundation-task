// 🔹 ENV MUST BE ON TOP
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


//  routes
const noteRoutes = require("./routes/note.routes");

const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- MONGODB -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error:", err.message);
    process.exit(1); // hard stop if mongo fails
  });

/* -------------------- ROUTES -------------------- */
app.use("/notes", noteRoutes);

/* -------------------- DEFAULT ROUTE -------------------- */
app.get("/", (req, res) => {
  res.send("Notes API running");
});

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
