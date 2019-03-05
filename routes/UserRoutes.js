const express = require('express');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const app = express.Router();


app.post("/signup", (req, res, next) => {


    

    bcrypt.hash(req.body.password, 10, (err, hash) => { 
        let user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then((result) => {
            let us = {
                id: result._id,
                email: result.email
            };
            res.status(201).json({
                msg: 1,
                user: {...result._doc, password: ''}
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: -1,
                content: err.message
            });
        });
    });

});



module.exports = app;   