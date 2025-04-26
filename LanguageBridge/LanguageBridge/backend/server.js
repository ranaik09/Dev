// ------- backend/server.js -------
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary In-Memory Database
let messages = {}; // { driverID: [{ customerMessage, translatedMessage, timestamp }] }

// Translate API function
async function translateText(text, sourceLang, targetLang) {
    try {
        const response = await axios.post('https://libretranslate.de/translate', {
            q: text,
            source: sourceLang,
            target: targetLang,
            format: "text"
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data.translatedText;
    } catch (error) {
        console.error('Translation Error:', error);
        return 'Translation Failed';
    }
}

// API: Customer sends message
app.post('/send', async (req, res) => {
    const { driverID, customerMessage, customerLang, driverLang } = req.body;
    const translatedMessage = await translateText(customerMessage, customerLang, driverLang);

    const newMessage = {
        customerMessage,
        translatedMessage,
        timestamp: new Date().toISOString()
    };

    if (!messages[driverID]) messages[driverID] = [];
    messages[driverID].push(newMessage);

    res.json({ success: true, translatedMessage });
});

// API: Driver fetches messages
app.get('/messages/:driverID', (req, res) => {
    const driverID = req.params.driverID;
    res.json(messages[driverID] || []);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

