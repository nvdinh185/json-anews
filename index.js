const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');

dotenv.config();

const route = require('./routes');

const publicPath = path.join(__dirname, "client");
app.use(express.static(publicPath));

// Router init
route(app);

app.get('/', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("CONNECTED MONGODB SUCCESS");
    } catch (error) {
        throw error;
    }
};

// mongoose.set("strictQuery", true);

mongoose.connection.on("disconnected", () => {
    console.log("MONGODB DISCONNECTED");
});
mongoose.connection.on("connected", () => {
    console.log("MONGODB CONNECTED");
});

// start server
const port = process.env.PORT;
app.listen(port, () => {
    connect();
    console.log(`Server is starting on port ${port}...`);
});