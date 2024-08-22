const express = require('express');
const app = express();
const cookieParesr = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

//importing error.js from middleware
const errorMiddleware = require("./middleware/error")


//config

dotenv.config({ path: 'backend/config/config.env' })


app.use(express.json());
app.use(cookieParesr());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports 
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middelware for error
app.use(errorMiddleware);

module.exports = app