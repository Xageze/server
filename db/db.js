const { connect } = require("mongoose")
const dotenv = require("dotenv")
dotenv.config();

function dbConnexion() {
    const password = process.env.MONGODB_PASSWORD;
    connect(`mongodb+srv://MyDigitalProjectUser:${password}@authcluster.whlbnt2.mongodb.net/`)
        .then(() => console.log("Connected to database"))
        .catch(err => console.log(err))
}

module.exports = dbConnexion;