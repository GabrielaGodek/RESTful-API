import mongoose from "mongoose";

const coffeeSchema = new mongoose.Schema({
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
        required: true,
        unique: false,
        trim: true,
    },
        salePrice: {
        type: Number,
        required: false,
        unique: false,
        trim: true,
        image: [String],
    }
})

const cofSchema = mongoose.model("Coffee", coffeeSchema)

export { cofSchema }