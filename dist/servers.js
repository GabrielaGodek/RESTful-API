"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.02salyf.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri, {});
            console.log(`connected to MongoDB 🏆`);
        }
        catch (error) {
            console.log(`Upsik 🚩: ${error}`);
        }
    });
}
connect();
const dbConnection = mongoose_1.default.connection;
dbConnection.once("open", (_) => {
    console.log(`Database connected: ${uri}`);
});
dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
});
const port = 3000;
const server = app_1.app.listen(port, () => {
    console.log(`App running on ${port}`);
});
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection: ', err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('uncaughtException', (err) => {
    console.log('uncaughtException: ', err);
    server.close(() => {
        process.exit(1);
    });
});
//# sourceMappingURL=servers.js.map