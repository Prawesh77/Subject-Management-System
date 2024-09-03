import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/db.config";
import { PORT_SERVER } from "./config/env.config";
import subRoute from "./routes/subRoute"

const PORT = PORT_SERVER || 4000;
const app = express();

app.use(express.json());

app.use("/", subRoute);

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connection successfull");
  })
  .catch((err) => {
    console.log("Database Connection failed", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
