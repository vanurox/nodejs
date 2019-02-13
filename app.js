var express = require('express');

var app = express();


app.post("/api/posts", (req, res, next) => {
    var posts =  [
        {
            id: 1,
            title: "First Post",
            post: "Regarding March event"
        },
        {
            id: 1,
            title: "Social Work",
            post: "Regarding Society"
        }
    ];
    res.status(200).json({
        msg: 1,
        posts: posts
    });
});

module.exports = app;