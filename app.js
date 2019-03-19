const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PostRoutes = require('./routes/PostRoutes');
const UserRoutes = require('./routes/UserRoutes');
const app = express();


mongoose.connect("mongodb://localhost:27017/blogs", { useNewUrlParser: true })
    .then(() => {
        console.log("Connection established successfully");
    })
    .catch(() => {
        console.log("Error while establishing connection to mongodb");
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static("images"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/posts",PostRoutes);
app.use("/api/users",UserRoutes);

module.exports = app;