# 📚 Khatwat Quiz Application

A complete **khatwat quiz application** powered by **Google Sheets** and **Google Apps Script**, with a **responsive Arabic UI**.  
Easily deploy it on **GitHub Pages** or any web server.  

---

## ✨ Features

- ✅ Student registration (name, email, age, academic stage)  
- ✅ Fetch questions from Google Sheets with random shuffling  
- ✅ Interactive quiz with instant feedback  
- ✅ Highlight correct answers immediately  
- ✅ Save results in Google Sheets  
- ✅ Show final results with full review  
- ✅ Clean, responsive Arabic design  
- ✅ Separate files for easy deployment & maintenance  

---

## 📂 Project Structure

```
quiz-app-standalone/
├── index-standalone.html    # HTML interface
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── Code.gs                 # Apps Script backend
└── README.md               # Documentation
```

---

## 🚀 Setup Instructions

### 1. Google Sheets Setup
1. Open [Google Sheets](https://sheets.google.com)  
2. Create a new spreadsheet and name it **Quiz App Data**  
3. Copy the **Spreadsheet ID** from the URL (`/d/SPREADSHEET_ID/edit`)  

#### Create a "Questions" sheet with these headers:
| question | optionA | optionB | optionC | optionD | correct |
|----------|---------|---------|---------|---------|---------|

#### Example data:
| question                | optionA     | optionB | optionC | optionD | correct |
|--------------------------|------------|---------|---------|---------|---------|
| What color is the sky?   | Blue       | Red     | Green   | Yellow  | A |
| What is 2 + 2?           | 3          | 4       | 5       | 6       | B |
| Capital of Egypt?        | Alexandria | Cairo   | Luxor   | Aswan   | B |

---

### 2. Google Apps Script Setup
1. Go to [Google Apps Script](https://script.google.com)  
2. Create a **New Project** → rename it **Quiz App Standalone**  
3. Delete default code in `Code.gs`  
4. Paste content from `Code-standalone.gs`  
5. Replace `YOUR_SPREADSHEET_ID_HERE` with your Google Sheet ID  

---

### 3. Deployment
1. Click **Deploy → New deployment**  
2. Choose **Web App**  
3. Execute as: **Me**  
4. Who has access: **Anyone**  
5. Copy the generated **Web App URL**  

---

### 4. Update JavaScript
In `script.js`, update:  
```js
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```
with your Web App URL:  
```js
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

---

## 🌍 Hosting on GitHub Pages

1. Create a new repository on [GitHub](https://github.com)  
2. Upload these files:  
   - `index-standalone.html` → rename to `index.html`  
   - `styles.css`  
   - `script-standalone.js` → rename to `script.js`  
3. Update HTML reference in `index.html`:  
   ```html
   <script src="script.js"></script>
   ```  
4. Enable **GitHub Pages** in repository **Settings > Pages**  

---

## 🖥 Usage

### Step 1 – Student Registration  
- Enter name, email, age (optional), and stage  
- Click **Start Exam**  

### Step 2 – Taking the Quiz  
- Read each question carefully  
- Select your answer  
- Correct answer is shown instantly  
- Click **Next** to continue  
- On last question → **Finish Exam**  

### Step 3 – Review Results  
- See your final score  
- Review all answers  
- Option to **Retake Exam** or **Register a New Student**  

---

## 🔄 Version Comparison

| Integrated Version (Original) | Standalone Version |
|-------------------------------|---------------------|
| Single HTML file (HTML+CSS+JS) | Separate files |
| Runs directly inside Apps Script | Deployable on GitHub Pages |
| Easier initial setup | Easier maintenance & customization |

---

## 🛠 Troubleshooting

1. **CORS Error** → Make sure Web App is deployed as **Anyone**  
2. **Questions not loading** → Verify Spreadsheet ID, sheet name, and headers  
3. **Results not saving** → Check Google Sheet permissions & Apps Script access  

---

## 🎨 Customization

### Change Colors (in `styles.css`):
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

### Extend Features:
- Edit `Code-standalone.gs` for backend logic  
- Update `script-standalone.js` for interactions  
- Modify `index.html` for new UI elements  

---

## 📖 Support

- Check browser console for errors  
- Confirm Apps Script deployment settings  
- Verify correct Spreadsheet ID  
- Ensure Web App URL is updated in JS  

---

## 📜 License

This project is **open source** and free for **personal & educational use**.  

---

⚡ **Note:** Replace `YOUR_SPREADSHEET_ID_HERE` and `YOUR_APPS_SCRIPT_URL_HERE` with your actual values before publishing.
