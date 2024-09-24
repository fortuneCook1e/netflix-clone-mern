import express from "express";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json()); // allow the request body to be parsed as JSON

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", movieRoutes);

const port = ENV_VARS.PORT;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
  connectDB();
});
