const mongoose = require('mongoose');

const ContactMeSchema = new mongoose.Schema({
    gmail: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const ContactMe = mongoose.model('ContactMe', ContactMeSchema);

module.exports = ContactMe;