const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require("./models/Post");
const app = express();


mongoose.connect("mongodb://localhost:27017/posts", { useNewUrlParser: true })
    .then(() => {
        console.log("Connection established successfully");
    })
    .catch(() => {
        console.log("Error while establishing connection to mongodb");
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        post: req.body.post
    });

    post.save()
        .then((result) => {
            res.status(200).json({
                msg: 1,
                posts: post
            })
        })
        .catch((err) => {
            res.status(422).json({
                error: err
            });
        });

});

module.exports = app;