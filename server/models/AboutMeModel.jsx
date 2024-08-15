const mongoose = require('mongoose');
const aboutSchema = new mongoose.Schema({
    experience: {
        years: String,
        field: String,
    },
    education: [{
        degree: String,
    }],
    paragraph: {
        type:String,
        required: false
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('About', aboutSchema);
