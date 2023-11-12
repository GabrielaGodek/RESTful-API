import { Document, Schema, model } from "mongoose";

function includesImageExtension(name: string) {
    return name.includes('svg');
}

interface CoffeeObj {
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    image: string;
}

interface CoffeeDoc extends CoffeeObj, Document {
    priceDifference?: number;
}

const coffeeSchema = new Schema<CoffeeDoc>({
    name: {
        type: String,
        required: [true, "Specify the name"],
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
    next();
});

coffeeSchema.virtual('priceDifference').get(function (this: CoffeeDoc) {
    return this.price - (this.salePrice ? this.salePrice : this.price);
});

const cofSchema = model<CoffeeDoc>("Coffee", coffeeSchema);

export { cofSchema, CoffeeDoc, CoffeeObj };
