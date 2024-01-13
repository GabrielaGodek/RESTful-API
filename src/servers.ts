import mongoose from "mongoose";
import { app } from "./app";
require('dotenv').config();

const uri: string =
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.02salyf.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
async function connect(): Promise<void> {
    try {
        await mongoose.connect(uri, {
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

const port: number = 3000;
const server = app.listen(port, () => {
    console.log(`App running on ${port}`);
});

process.on('unhandledRejection', (err: any) => {
    console.log('unhandledRejection: ', err.name, err.message)
    server.close(() => {
        process.exit(1)
    })
})

process.on('uncaughtException', (err: any) => {
    console.log('uncaughtException: ', err)
    server.close(() => {
        process.exit(1)
    })
})
