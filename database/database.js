// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
console.log(process.env.MONGO_URI);

mongoose.connect("mongodb+srv://montu5551suthar:ngzFsy83UPOZ1rTN@doconverter1.cqnwftp.mongodb.net/")
  .then((conn) => {
    console.log(`MongoDB connected`);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  });
}
module.exports = connectDB;