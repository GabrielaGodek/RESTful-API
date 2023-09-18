import express from "express";
import { readFileSync } from "fs";

const app = express();

const dataObj = JSON.parse(readFileSync("./data/db.json"));
app.get("/coffees", (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      results: dataObj.length,
      data: { coffees: dataObj },
    });
});

const port = 8080;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
