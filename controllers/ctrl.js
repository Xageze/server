const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/model');
const userValidation = require('../validation/validation');
const dotenv = require("dotenv")

dotenv.config();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.inscription = (req, res) => {
    console.log("USER SIGNUP");
    const { body } = req;

    // Data validation
    const { err } = userValidation(body).userValidationSignup;
    if (err) return res.status(401).json(err.details[0].message);

    // Password hashing
    bcrypt.hash(body.password, 10)
        .then(hash => {
            if (!hash) return res.status(500).json({ msg: "Error while hashing password" })

            // Replace password by hash
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
    console.log("USER LOGIN");
    const { email, password } = req.body;

    // Data validation
    const { err } = userValidation(req.body).userValidationLogin;
    if (err) return res.status(401).json(err.details[0].message);

    // Find user by email
    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(404).json({ msg: "User not found" });

            // Handle password check
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (!match) return res.status(401).json({ msg: "Incorrect password" });

                    // ENV variables
                    // Token creation
                    res.status(200).json({
                        email: user.email,
                        id: user._id,
                        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" })
                    });

                    console.log(user);
                })
                .catch(err => {
                    // Handle bcrypt compare error
                    res.status(500).json({ error: "An error occurred while comparing passwords" });
                    console.error(err);
                });
        })
        .catch(err => {
            // Handle user.findOne error
            res.status(500).json({ error: "An error occurred while finding the user" });
            console.error(err);
        });
};
