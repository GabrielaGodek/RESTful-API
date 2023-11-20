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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoffeeStats = exports.aliasForBestsellers = exports.deleteCoffee = exports.createCoffees = exports.updateCoffee = exports.getCoffee = exports.getAllCoffees = void 0;
const coffeeModel_1 = require("../models/coffeeModel");
const apiFeatures_1 = require("../utils/apiFeatures");
const errorHandler_1 = __importStar(require("../utils/errorHandler"));
const getAllCoffees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coffeeModel = coffeeModel_1.cofSchema;
        const filterFeature = new apiFeatures_1.APIFeatures(coffeeModel.find(), req.query).filter().sort().fields().pagination();
        const coffeesData = yield filterFeature.query;
        res.json({
            status: 'success',
            result: coffeesData.length,
            coffees: coffeesData
        });
    }
    catch (err) {
        next(new errorHandler_1.default('NOT FOUND', errorHandler_1.HttpStatusCode.NOT_FOUND, true, 'Data was not found'));
    }
});
exports.getAllCoffees = getAllCoffees;
const getCoffee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coffee = yield coffeeModel_1.cofSchema.findById(req.params.id);
        if (!coffee) {
            return next(new errorHandler_1.default('BAD REQUEST', errorHandler_1.HttpStatusCode.BAD_REQUEST, true, 'Incorrect ID'));
        }
        res.json({
            status: 'success',
            coffees: coffee
        });
    }
    catch (err) {
        next(new errorHandler_1.default('BAD REQUEST', errorHandler_1.HttpStatusCode.BAD_REQUEST, true, 'Incorrect ID'));
    }
});
exports.getCoffee = getCoffee;
const updateCoffee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coffeeToUpdate = yield coffeeModel_1.cofSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        yield (coffeeToUpdate === null || coffeeToUpdate === void 0 ? void 0 : coffeeToUpdate.save());
        res.json({
            status: 'updated',
            updatedCoffee: coffeeToUpdate
        });
    }
    catch (err) {
        next(new errorHandler_1.default('BAD REQUEST', errorHandler_1.HttpStatusCode.BAD_REQUEST, true, 'Incorrect fields'));
    }
});
exports.updateCoffee = updateCoffee;
const createCoffees = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newCoffee = new coffeeModel_1.cofSchema(req.body);
    try {
        yield newCoffee.save();
        res.json({
            status: 'created',
            addedCoffee: newCoffee
        });
    }
    catch (err) {
        // console.log(err)
        next(new errorHandler_1.default('BAD REQUEST', errorHandler_1.HttpStatusCode.BAD_REQUEST, true, 'Incorrect or duplicate fields'));
    }
});
exports.createCoffees = createCoffees;
const deleteCoffee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coffeeToDelete = yield coffeeModel_1.cofSchema.findByIdAndDelete(req.params.id);
        res.json({
            status: "deleted",
            data: null
        });
    }
    catch (err) {
        next(new errorHandler_1.default('INTERNAL SERVER', errorHandler_1.HttpStatusCode.INTERNAL_SERVER, true));
    }
});
exports.deleteCoffee = deleteCoffee;
const aliasForBestsellers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.query.limit = '3';
    req.query.sort = 'salePrice,price';
    next();
});
exports.aliasForBestsellers = aliasForBestsellers;
const getCoffeeStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield coffeeModel_1.cofSchema.aggregate([
            {
                $match: { price: { $gte: 10 } }
            },
            {
                $group: {
                    _id: '$description',
                    numOfCoffees: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: {
                    avgPrice: 1
                }
            }
        ]);
        res.json({
            status: 'stats',
            data: stats
        });
    }
    catch (err) {
        next(new errorHandler_1.default('INTERNAL SERVER', errorHandler_1.HttpStatusCode.INTERNAL_SERVER, true, 'Cannot download selected statistics'));
    }
});
exports.getCoffeeStats = getCoffeeStats;
//# sourceMappingURL=coffeesControllers.js.map