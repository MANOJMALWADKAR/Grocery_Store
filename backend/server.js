const app = require('./app')

const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require("./config/database")

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down Server Due To Uncaught Exception`)
    process.exit(1);

});


//config

dotenv.config({ path: 'backend/config/config.env' })

//connectig database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// console.log(youtube) for uncaught exception error

//unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down Server Due To Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1);
    });
});