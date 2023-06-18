const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/model');
const userValidation = require('../validation/validation');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.inscription = (req, res) => {
    // Récupérer les données
    const { body } = req;

    // Valider les données 
    const { err } = userValidation(body).userValidationSignup;
    if (err) return res.status(401).json(err.details[0].message);

    // Hash du mot de passe
    bcrypt.hash(body.password, 10)
        .then(hash => {
            if (!hash) return res.status(500).json({ msg: "Error while hashing password" })

            // Remplacer mot de passe par le hash
            delete body.password
            new User({ ...body, password: hash })
                .save()
                .then((user) => {
                    console.log(user);
                    res.status(201).json({ msg: "User created" })
                })
                .catch((err) => { res.status(500).json(err) })
        })
        .catch((err) => { res.status(500).json(err) });
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.connexion = (req, res) => {
    const { email, password } = req.body;
    // Validation des données
    const { err } = userValidation(req.body).userValidationLogin
    if (err) return res.status(401).json(err.details[0].message);

    // Trouver l'utilisateur dans la base de données
    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(404).json({ msg: "User not found" });

            // Vérification du mot de passe
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) return res.status(500).json({ msg: "Server error" });

                    // Création du token
                    res.status(200).json({
                        email: user.email,
                        id: user._id,
                        token: jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "12h" })
                    })
                        .catch((err) => { res.status(500).json(err) });

                    console.log(user);
                })
                .catch((err) => { res.status(500).json(err) });
        })
};