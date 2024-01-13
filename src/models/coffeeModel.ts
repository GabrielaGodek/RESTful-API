import { Document, Schema, model, Query } from "mongoose";
import slugify from "slugify";
import validator from "validator"

interface CoffeeObj {
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    image: string;
    vegan: boolean
}

interface CoffeeDoc extends CoffeeObj, Document {
    priceDifference?: number;
    slug?: string
    find: (vegan?: any) => Query<any, any>;
}

const coffeeSchema = new Schema<CoffeeDoc>({
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
            validator: function (this: CoffeeDoc, value: number): boolean {
                let isLess: boolean
                if(value) {
                    isLess = value < this.price
                } else {
                    isLess = false
                }
                return isLess
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
            validator: function (name: string): boolean {
                const regex = /.svg$|.jpg$|.jpeg$|.png$/g
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

coffeeSchema.pre('save', function (next: () => void) {
    if (!this.salePrice) {
        this.salePrice = this.price;
    }
    this.slug = slugify(this.name, { lower: true })
    next();
})
    // .pre(/^find/, function (next: () => void) {
    //     this.find({ vegan: false })
    //     next()
    // })
    // .pre('aggregate', function (next: () => void) {
    //     this.pipeline().unshift({ $match: { vegan: false } })
    //     next()
    // });

coffeeSchema.virtual('priceDifference').get(function (this: CoffeeDoc) {
    return this.price - (this.salePrice ? this.salePrice : this.price);
});

const cofSchema = model<CoffeeDoc>("Coffee", coffeeSchema);

export { cofSchema, CoffeeDoc, CoffeeObj };
