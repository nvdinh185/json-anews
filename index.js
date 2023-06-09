const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const route = require('./routes');

app.use(express.static(__dirname + "/client"));

// Router init
route(app);

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