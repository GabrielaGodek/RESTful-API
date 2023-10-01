import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You need to specify name'],
        tim: true
    },
    password: {
        type: String,
        required: [true, 'You need to add password'],
        minlength: 1,
        maxlength: 5
    }
})

const User = mongoose.model('User', userSchema)

export { User }