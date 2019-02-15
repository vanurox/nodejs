const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.get("/api/posts", (req, res, next) => {
    // var post = req.body;
    var posts = [
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