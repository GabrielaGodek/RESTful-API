import express from "express";
import morgan from "morgan";
import coffeesRoutes from "../routes/coffeesRoutes.js";
import usersRoutes from "../routes/usersRoutes.js";
import welcomeRoutes from "../routes/welcomeRoutes.js";
import compression from "compression"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});
app.use(compression())

app.use('/', welcomeRoutes)
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/coffees", coffeesRoutes);

export { app };
