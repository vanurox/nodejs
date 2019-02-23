const express = require('express');
const Post = require("../models/Post");
const app = express.Router();


app.post("", (req, res, next) => {
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


app.get("", (req, res, next) => {
    Post.find()
        .then((result) => {
            res.status(200).json({
                posts: result
            });
        })
        .catch((err) => {
            console.log(`Error while fetching Posts ${err}`);
        })


});

app.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({
                msg: `${req.params.id} has been deleted successfully`,
            });
        })
        .catch((err) => {
            res.status(422).json({
                msg: -1,
                error: err
            });
        });
});

app.put("/:id", (req, res, next) => {
    let post = {
        title: req.body.title,
        post: req.body.post
    };
    Post.updateOne({ _id: req.params.id }, post)
        .then((result) => {
            res.status(200).json({
                msg: `${req.params.id} has been Updated successfully`,
                post: result
            });
        })
        .catch((err) => {
            res.status(422).json({
                msg: -1,
                error: err
            });
        });
});

module.exports = app;   