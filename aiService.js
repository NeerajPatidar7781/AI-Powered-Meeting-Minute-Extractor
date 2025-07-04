const { GoogleGenerativeAI } = require('@google/generative-ai');
const AI_TIMEOUT_MS = 15000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function processMeetingNotes(meetingNotes) {
    const prompt = `You are an AI assistant specialized in extracting key information from meeting notes.
Your goal is to provide a concise summary, a list of key decisions, and a structured list of action items.
Please output the result ONLY as a JSON object, following this exact structure:

{
  "summary": "A 2-3 sentence summary of the meeting.",
  "decisions": [
    "Key decision 1",
    "Key decision 2",
    "..."
  ],
  "actionItems": [
    {
      "task": "Description of task 1",
      "owner": "Optional Owner Name",
      "due": "Optional Deadline (e.g., 'June 5', 'EOD')"
    },
    {
      "task": "Description of task 2",
      "owner": "Optional Owner Name"
    },
    {
      "task": "Description of task 3"
    }
  ]
}

If no decisions or action items are found, the respective arrays should be empty ([]).
If an owner or due date is not specified for an action item, omit that field for that specific item.

Here are the meeting notes:
---
${meetingNotes}
---`;

    let aiResponseText;
    try {
        const timeoutPromise = new Promise((resolve, reject) =>
            setTimeout(() => {
                const timeoutError = new Error('AI API call timed out');
                timeoutError.timeoutMs = AI_TIMEOUT_MS;
                reject(timeoutError);
            }, AI_TIMEOUT_MS)
        );

        const aiResponse = await Promise.race([
            model.generateContent(prompt).then(res => res.response.text()),
            timeoutPromise
        ]);
        aiResponseText = aiResponse;

        if (aiResponseText.startsWith('```json')) {
            aiResponseText = aiResponseText.substring(7, aiResponseText.lastIndexOf('```')).trim();
        }

        const parsedResult = JSON.parse(aiResponseText);

        return parsedResult;

    } catch (aiError) {
        if (aiError.message === 'AI API call timed out') {
            const errorToThrow = new Error(aiError.message);
            errorToThrow.timeoutMs = aiError.timeoutMs;
            throw errorToThrow;
        } else {
            const errorToThrow = new Error('AI processing failed or returned invalid JSON.');
            errorToThrow.aiRawResponse = aiResponseText;
            throw errorToThrow;
        }
    }
}

module.exports = processMeetingNotes;