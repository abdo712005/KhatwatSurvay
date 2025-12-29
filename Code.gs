/********************************
 * GET QUESTIONS (EXAM)
 ********************************/
function doGet() {
  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("QuestionBank");

  const data = sheet.getDataRange().getValues();
  const headers = data.shift();

  const questions = data.map(row => {
    let obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i];
    });
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify({
      questions: questions
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/********************************
 * POST – SAVE EXAM / FEEDBACK
 ********************************/
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const type = e.parameter.type;   // exam | feedback
  const email = e.parameter.email || "";

  // ===== EXAM SUBMIT =====
  if (type === "exam") {
    const answers = JSON.parse(e.parameter.answers || "[]");

    saveExamResponses(ss, {
      email: email,
      answers: answers
    });
  }

  // ===== FEEDBACK SUBMIT =====
  if (type === "feedback") {
    const feedback = JSON.parse(e.parameter.feedback || "{}");

    saveFeedbackResponses(ss, {
      email: email,
      feedback: feedback
    });
  }

  return ContentService
    .createTextOutput("OK")
    .setMimeType(ContentService.MimeType.TEXT);
}

/********************************
 * SAVE EXAM RESPONSES
 ********************************/
function saveExamResponses(ss, body) {
  const sheet = ss.getSheetByName("Exam_Responses");

  const rows = body.answers.map(a => ([
    body.email,              // StudentEmail
    a.questionId || "",      // QuestionID
    a.subject || "",         // Subject
    a.selected || "",        // SelectedAnswer
    a.correct || "",         // CorrectAnswer
    a.isCorrect ? 1 : 0      // IsCorrect
  ]));

  if (rows.length > 0) {
    sheet.getRange(
      sheet.getLastRow() + 1,
      1,
      rows.length,
      rows[0].length
    ).setValues(rows);
  }
}

/********************************
 * SAVE FEEDBACK RESPONSES
 ********************************/
function saveFeedbackResponses(ss, body) {
  const sheet = ss.getSheetByName("Feedback");
  const f = body.feedback;

  sheet.appendRow([
    body.email,
    f.F1 || "",
    f.F2 || "",
    f.F3 || "",
    f.F4 || "",
    f.F5 || "",
    f.F6 || "",
    f.F7 || "",
    f.F8 || ""
  ]);
}
