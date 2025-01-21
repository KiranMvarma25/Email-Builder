const mongoose = require('mongoose');

require('dotenv').config();
let url = process.env.url;

const dbConnect = () => {
    mongoose.connect(url)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));
}

module.exports = dbConnect;