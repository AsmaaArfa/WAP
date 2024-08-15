const express = require('express');
const router = express.Router();
const ContactMe = require('../models/ContactMeModel.jsx');

// Create or Update ContactMe
router.post('/api/contact', async (req, res) => {
    const { gmail, linkedIn, username } = req.body;
    if (!gmail || !linkedIn || !username) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const contactMe = await ContactMe.findOneAndUpdate(
            { username },
            { gmail, linkedIn },
            { upsert: true, new: true }
        );
        res.json(contactMe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read ContactMe by User ID
router.get('/api/contact/:userID', async (req, res) => {
    try {
        const contactMe = await ContactMe.findOne({ username: req.params.userID });
        if (!contactMe) {
            return res.status(404).json({ message: 'Contact Me not found' });
        }
        res.json(contactMe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update
router.put('/api/contact/:userID', async (req, res) => {
    const { gmail, linkedIn } = req.body;
    try {
        const contact = await ContactMe.findOneAndUpdate(
            { username : req.params.userID },
            { gmail, linkedIn },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact Me not found' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete ContactMe by User ID
router.delete('/api/contact/:userID', async (req, res) => {
    try {
        const contactMe = await ContactMe.findOneAndDelete({ username: req.params.userID });
        if (!contactMe) {
            return res.status(404).json({ message: 'Contact Me not found' });
        }
        res.json({ message: 'Contact Me section deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;