require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const nurseryRoutes = require("./routes/NurseryRoutes");

app.use(express.json());
app.use(cors({
    // origin: 'https://minor-project-delta.vercel.app',
    origin: 'http://localhost:5173',
    credentials: true,
}));

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connection successful!");
    })
    .catch((error) => console.log(error.message));

app.use("/api/auth", userRoutes);
app.use("/api/authn", nurseryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`)
})
