const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    imageUrl : {
        type : String
    },
    title : {
        type : String,
        require : true
    },
    body : {
        type : String,
        require : true,
    }
});

module.exports = mongoose.model("EmailBuilder", emailSchema);