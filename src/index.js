import express from "express";
import morgan from "morgan";
import coffeesRoutes from "../routes/coffeesRoutes.js";
import usersRoutes from "../routes/usersRoutes.js";
import welcomeRoutes from "../routes/welcomeRoutes.js";
import compression from "compression";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.use("/", welcomeRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/coffees", coffeesRoutes);

export { app };
