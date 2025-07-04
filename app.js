require('dotenv').config();
const express = require('express');
const multer = require('multer');
const processMeetingNotes = require('./aiService');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Meeting Minutes Extractor API is running!');
});

app.post('/process-meeting', upload.single('text_file'), async (req, res) => {
    let meetingNotes;

    try {
        if (req.file) {
            if (req.file.mimetype !== 'text/plain') {
                return res.status(400).json({ error: 'Only .txt files are allowed for upload.' });
            }
            meetingNotes = req.file.buffer.toString('utf8');
            console.log('Received meeting notes from file upload:');
        } else if (req.body.rawText) {
            meetingNotes = req.body.rawText;
            console.log('Received meeting notes from raw text body:');
        } else {
            return res.status(400).json({ error: 'No meeting notes provided. Please send raw text in "rawText" field or upload a .txt file as "text_file".' });
        }

        console.log(meetingNotes.substring(0, 200) + '...');

        const result = await processMeetingNotes(meetingNotes);

        res.json(result);

    } catch (error) {
        console.error('Error processing meeting notes:', error);

        if (error.message === 'AI API call timed out') {
            return res.status(504).json({ error: error.message, timeoutMs: error.timeoutMs });
        } else if (error.message.includes('AI processing failed or returned invalid JSON')) {
            return res.status(500).json({ error: error.message, aiRawResponse: error.aiRawResponse });
        } else {
            res.status(500).json({ error: 'Internal server error while processing input.' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});