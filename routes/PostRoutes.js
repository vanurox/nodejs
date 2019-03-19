const express = require('express');
const Post = require("../models/Post");
const app = express.Router();
const multer = require('multer');
const AuthenticateRequest = require('../middlewares/Authenticate');

const GET_EXT = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

let img = "";
let error;
const config = multer.diskStorage({
    destination: (req, file, cb) => {
        let erAuthenticateRequestr = "";
        if (!(GET_EXT[file.mimetype]))
            error = new Error("Image not detected");

        cb(error, 'images');
    },
    filename: (req, file, cb) => {
        const filename = file.originalname.split(".");
        const ext = GET_EXT[file.mimetype];
        img = filename[0] + Date.now() + "." + ext;
        cb(null, img);
    }
});



app.post("", AuthenticateRequest, multer({ storage: config }).single('image'), (req, res, next) => {
    const protocol = req.protocol;
    const url = req.get('host');
    const post = new Post({
        title: req.body.title,
        post: req.body.post,
        image: protocol + "://" + url + "/images/" + req.file.filename,
        userId: req.userInfo.userId
    });

    post.save()
        .then((result) => {
            res.status(200).json({
                msg: 1,
                posts: post,
                url: url
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

app.delete("/:id", AuthenticateRequest, (req, res, next) => {
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

app.put("/:id", AuthenticateRequest, multer({ storage: config }).single('image'), (req, res, next) => {
    let imageUrl = req.body.image;
    console.log(req.file);
    if (req.file) {
        const protocol = req.protocol;
        const url = req.get('host');
        imageUrl = protocol + "://" + url + "/images/" + req.file.filename;
    }
    let post = {
        title: req.body.title,
        post: req.body.post,
        image: imageUrl
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