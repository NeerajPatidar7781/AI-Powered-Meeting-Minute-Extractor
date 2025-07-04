# AI-Powered-Meeting-Minute-Extractor
This project implements a robust backend service using Node.js that leverages the power of Artificial Intelligence to automatically process raw meeting notes and extract key information in a structured JSON format. It's designed to streamline the process of summarizing discussions, identifying crucial decisions, and listing actionable tasks.
Create a new directory for your project and navigate into it
mkdir meeting-minutes-extractor
cd meeting-minutes-extractor
Initialize a new Node.js project
npm init -y
Install Dependencies
Install the necessary npm packages. Choose the AI SDK
npm install express dotenv multer @google/generative-ai
Create Project Files
You will create two main JavaScript files in your project root: app.js and aiService.js.
Configure Environment Variables (.env)
Create a file named .env in your project's root directory. Replace YOUR_GEMINI_API_KEY_HERE with your actual Google Gemini API key.
Open your terminal or command prompt.
Navigate to your project's root directory.
Start the Node.js server
node app.js
Testing using postman
Raw Text Body: You'll configure Postman's Body tab to raw and JSON, then paste your notes into the "rawText" field.
File Upload: You'll use the form-data option in the Body tab, setting the key to "text_file" and selecting your .txt file.
Then click on send,you will see the json output on postman
