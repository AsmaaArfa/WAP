// server/routes/aboutmeRouter.js

const express = require('express');
const router = express.Router();
const About = require('../models/AboutMeModel.jsx'); // Adjust the extension to .js
// const {username} = require('../server.js');

// const { port, dbURI } = require('./config');


// Create or Update
router.post('/api/about', async (req, res) => {

    // console.log ("about api username")
    const { experience, education, paragraph, username } = req.body; //userID
    try {
        const about = await About.findOneAndUpdate(
            // { userID }, // Find by userID
            { username },
            { experience, education, paragraph },
            { upsert: true, new: true }
        );
        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read
router.get('/api/about/:userID', async (req, res) => {
    try {
        console.log('get about me', req.params.userID)
        const about = await About.findOne({ username : req.params.userID});
        console.log('get about me', about)
        if (!about) {
            return res.status(404).json({ message: 'About Me not found' });
        }
        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/api/about/:userID', async (req, res) => {
    
    const { experience, education, paragraph } = req.body;
    try {
        const about = await About.findOneAndUpdate(
            { username: req.params.userID },
            { experience, education, paragraph },
            { new: true }
        );
        if (!about) {
            return res.status(404).json({ message: 'About Me not found' });
        }
        res.json(about);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete
router.delete('/api/about/:userID', async (req, res) => {
    try {
        const result = await About.findOneAndDelete({ userID: req.params.userID });
        if (!result) {
            return res.status(404).json({ message: 'About Me not found' });
        }
        res.json({ message: 'About Me section deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;