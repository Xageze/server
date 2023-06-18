const { connect } = require("mongoose")

function dbConnexion() {
    // TODO : Connexion à la base de donnée + Password ENV
    connect("mongodb+srv://MyDigitalProjectUser:9Yn7ClfxASJDbchc@authcluster.whlbnt2.mongodb.net/")
        .then(() => console.log("Connected to database"))
        .catch(err => console.log(err))
}

module.exports = dbConnexion;