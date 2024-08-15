const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // URL to the image
    description: { type: String, required: true },
    githubLink: { type: String, required: true },
    liveDemoLink: { type: String, required: true },
    // userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
     username: { type: String }
});

module.exports = mongoose.model('Project', projectSchema);