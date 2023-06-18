const mongoose = require("mongoose");
const muv = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    selectedSubscription: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
    }, civility: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

mongoose.plugin(muv)

module.exports = mongoose.model("user", userSchema);