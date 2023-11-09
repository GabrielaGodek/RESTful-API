"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cofSchema = void 0;
const mongoose_1 = require("mongoose");
function includesImageExtension(name) {
    return name.includes('svg');
}
const coffeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: [true, "Specify the name"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "You need to specify description"],
        unique: false,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product must have a price"],
        unique: false,
        trim: true,
    },
    salePrice: {
        type: Number,
        required: false,
        unique: false,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        validate: [includesImageExtension, 'Should be an image']
    },
}).pre('save', function (next) {
    if (!this.salePrice) {
        this.salePrice = this.price;
    }
    next();
});
const cofSchema = (0, mongoose_1.model)("Coffee", coffeeSchema);
exports.cofSchema = cofSchema;
