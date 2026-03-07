require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/UserRoutes");
const nurseryRoutes = require("./routes/NurseryRoutes");

const app = express();

const PORT = process.env.PORT || 5001;
const DB_URI = process.env.DB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", userRoutes);
app.use("/api/authn", nurseryRoutes);

if (!DB_URI) {
  console.error("Missing DB_URI in environment.");
  process.exit(1);
}

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB connection successful!");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
