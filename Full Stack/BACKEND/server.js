const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

mongoose.connection.once("open", () => {
    console.log("Connection Success!");
})

const routes = require("./Routes/index.js");
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server Connected to port: ${PORT}`);
})