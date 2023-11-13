"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const coffeesRoutes_1 = __importDefault(require("./routes/coffeesRoutes"));
const errorHandler_1 = __importStar(require("./utils/errorHandler"));
const errorControllers_1 = __importDefault(require("./controllers/errorControllers"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, body_parser_1.json)());
app.use('/api/v1/coffees', coffeesRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new errorHandler_1.default('NOT FOUND', errorHandler_1.HttpStatusCode.NOT_FOUND, true, 'not existing address'));
});
app.use(errorControllers_1.default);
//# sourceMappingURL=app.js.map