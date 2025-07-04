# AI-Powered-Meeting-Minute-Extractor

This repository hosts a robust Node.js backend service engineered to automate the processing of raw meeting notes. By harnessing Artificial Intelligence, it efficiently identifies and extracts crucial information, including meeting summaries, key decisions, and actionable tasks, presenting the output in a clear, structured JSON format. This streamlines the documentation and follow-up processes for discussions.

## Installation Setup
Create a new directory for your project and navigate into it.
Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.
```bash
mkdir meeting-minutes-extractor
cd meeting-minutes-extractor
```

Initialize a new Node.js project
```bash
npm init -y
```

Install the necessary npm packages
```bash
npm install express dotenv multer @google/generative-ai
```
## Create Project Files
Create two main JavaScript files in your project root: app.js (for the main server logic) and aiService.js (for AI-related functionalities).

## Configure Environment Variables (.env)
Create a file named .env in your project's root directory. Replace YOUR_GEMINI_API_KEY_HERE with your actual Google Gemini API key.
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

## Running the Application
Open your command prompt or terminal and navigate to project's root directory and start the server.
```bash
node app.js
```

## Testing with Postman
### Raw Text Body
In Postman, set the request method to POST.
Set the URL to your API endpoint
Go to the Body tab, select raw, and choose JSON from the dropdown.
Paste your meeting notes into the JSON body, wrapped in a rawText field:
```bash
{
    "rawText": "Attendees: John, Jane, Mike. Discussion: Project Alpha progress, budget review. Decisions: Increase budget by 10%, assign Jane to lead next phase. Tasks: John to update budget spreadsheet, Mike to schedule next meeting."
}
```
### File Upload
To upload meeting notes from a .txt file:

In Postman, set the request method to POST.

Set the URL to your API endpoint.

Go to the Body tab, select form-data.

Set the KEY to text_file and choose File from the dropdown next to it.

Click Select Files and choose your .txt file containing the meeting notes.

After configuring your request (either raw text or file upload), click Send. You will see the structured JSON output in the Postman response body.


Contributing
Contributions are welcome! If you have suggestions for improvements or find a bug, please open an issue or submit a pull request.
