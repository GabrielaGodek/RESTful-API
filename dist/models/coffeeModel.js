"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cofSchema = void 0;
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const coffeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Specify unique name"],
        unique: true,
        trim: true,
        minlength: 5,
    },
    slug: String,
    description: {
        type: String,
        required: [true, "You need to specify description"],
        unique: false,
        trim: true,
        minlength: [15, "Provide description for selected coffee"],
    },
    price: {
        type: Number,
        required: [true, "Product must have a price"],
        unique: false,
        trim: true,
        min: 1
    },
    salePrice: {
        type: Number,
        required: false,
        unique: false,
        trim: true,
        min: 0,
        validate: {
            validator: function (value) {
                let isLess;
                if (value) {
                    isLess = value < this.price;
                }
                else {
                    isLess = false;
                }
                return isLess;
            },
            message: "Sale price ({VALUE}) can't be higher than price"
        }
    },
    image: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        validate: {
            validator: function (name) {
                const regex = /.svg$|.jpg$|.jpeg$|.png$/g;
                return regex.test(name);
            },
            message: 'Upload file should be an image'
        }
    },
    vegan: {
        type: Boolean,
        default: false,
        required: false,
        trim: true
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    }
});
coffeeSchema.pre('save', function (next) {
    if (!this.salePrice) {
        this.salePrice = this.price;
    }
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    next();
});
// .pre(/^find/, function (next: () => void) {
//     this.find({ vegan: false })
//     next()
// })
// .pre('aggregate', function (next: () => void) {
//     this.pipeline().unshift({ $match: { vegan: false } })
//     next()
// });
coffeeSchema.virtual('priceDifference').get(function () {
    return this.price - (this.salePrice ? this.salePrice : this.price);
});
const cofSchema = (0, mongoose_1.model)("Coffee", coffeeSchema);
exports.cofSchema = cofSchema;
//# sourceMappingURL=coffeeModel.js.map