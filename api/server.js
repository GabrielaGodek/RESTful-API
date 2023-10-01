// import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import { app } from "./index.js";

const uri =
  "mongodb+srv://g0gab1s:gbdG73ZV8Luj3uqE@lazycup.02salyf.mongodb.net/test?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to MongoDB 🏆`);
  } catch (error) {
    console.log(`Upsik 🚩: ${error}`);
  }
}

connect();

const dbConnection = mongoose.connection;
dbConnection.once("open", (_) => {
  console.log(`Database connected: ${uri}`);
});
dbConnection.on("error", (err) => {
  console.error(`connection error: ${err}`);
});


const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
