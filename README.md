📚 Khatwat Quiz & Feedback System

A complete Arabic quiz and feedback system for students, built using
HTML, CSS, JavaScript with Google Sheets + Google Apps Script as backend.

The system is designed for graduation projects and can be deployed easily on
GitHub Pages with no backend server required.

✨ Features

✅ Student registration (name, email, age, academic stage)

✅ Fetch exam questions dynamically from Google Sheets

✅ Randomized questions from multiple subjects

✅ Interactive exam interface (one question at a time)

✅ Automatic score calculation after exam completion

✅ Final results screen (correct / incorrect / percentage)

✅ Post-exam feedback questionnaire

✅ Save exam answers + feedback directly to Google Sheets

✅ Arabic UI with clean and responsive design

✅ No CORS issues (Form Submit + Hidden iframe solution)

✅ Fully compatible with GitHub Pages

📂 Project Structure
khatwat-quiz-system/
├── index.html        # Main HTML interface
├── styles.css        # Styling & UI design
├── script.js         # Frontend logic (exam + feedback)
├── Code.gs           # Google Apps Script backend
└── README.md         # Project documentation

🚀 Setup Instructions
1️⃣ Google Sheets Setup

Open Google Sheets

Create a new spreadsheet

Create the following sheets:

📄 QuestionBank

Headers must match exactly:

QuestionID	QuestionText	OptionA	OptionB	OptionC	OptionD	CorrectAnswer	Subject
📄 Exam_Responses

Used to store exam answers automatically.

| StudentEmail | QuestionID | Subject | SelectedAnswer | CorrectAnswer | IsCorrect |

📄 Feedback

Used to store feedback answers.

| Email | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 |

2️⃣ Google Apps Script Setup

Open Extensions → Apps Script from Google Sheets

Replace the default code with the provided Code.gs

Make sure the script contains:

doGet() → fetch questions

doPost() → save exam & feedback

Save the project

3️⃣ Deploy Google Apps Script

Click Deploy → New deployment

Select Web App

Settings:

Execute as: Me

Who has access: Anyone

Deploy and copy the Web App URL

4️⃣ Update Frontend Configuration

In script.js, update:

const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";


Replace it with your deployed Apps Script URL:

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

🌍 Deploy on GitHub Pages

Create a new Public GitHub repository

Upload:

index.html

styles.css

script.js

Go to Settings → Pages

Select:

Branch: main

Folder: /root

Save and open the generated GitHub Pages URL 🎉

🖥 How the System Works
Step 1 – Registration

Student enters name, email, age, and academic stage

Clicks Start Exam

Step 2 – Exam

Questions are loaded from Google Sheets

One question is shown at a time

Student must select an answer before moving on

Progress bar updates dynamically

Step 3 – Results

System calculates:

Total questions

Correct answers

Incorrect answers

Percentage score

Results are displayed clearly to the student

Step 4 – Feedback

Student completes feedback questions

Feedback responses are saved to Google Sheets

Final “Thank You” screen is shown

🛠 Technical Notes

Exam & feedback submission uses hidden HTML form + iframe

Prevents page reload and avoids CORS issues

Backend handled entirely by Google Apps Script

Frontend is static → ideal for GitHub Pages

🧪 Troubleshooting

Questions not loading
→ Check sheet name QuestionBank and headers

Answers not saving
→ Ensure Apps Script is deployed as Anyone

Page redirects to OK
→ Confirm the form uses target="hiddenFrame"

🎓 Project Use Case

Graduation project (Information Systems / Computer Science)

Online assessments

Surveys + quizzes

Educational platforms

📜 License

This project is free for educational and academic use.
You may modify and extend it for learning or graduation purposes.

⚠️ Important:
Before publishing, always make sure:

Google Apps Script URL is correct

Sheet names and headers are exact

Repository is public for GitHub Pages
