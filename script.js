/********************************
 * QUIZ SYSTEM – EXAM + FEEDBACK
 * FINAL VERSION (FORM SUBMIT)
 ********************************/

/* ========= CONFIG ========= */
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxp1Sf97gOdK-VFFuDqlvIAg_CKqWonlBMJmanS7fMpWKH8cNU5PSEaqFwXn0dIL7mZ/exec";

/* ========= STATE ========= */
let questions = [];
let currentIndex = 0;
let answers = [];
let feedbackAnswers = [];
let answered = false;
let mode = "exam";
let studentEmail = "";


function answersKey() {
  return `khatwat_answers_${studentEmail}`;
}

function indexKey() {
  return `khatwat_index_${studentEmail}`;
}
/* ========= FEEDBACK QUESTIONS ========= */
const feedbackQuestions = [
  { id:"F1", question:"ما الشكل الذي تفضّله للامتحان النهائي؟", options:["امتحان موحّد شامل","امتحانات منفصلة لكل مادة","نموذج مزدوج","لا أفضّل"] },
  { id:"F2", question:"ما رأيك في نظام الباكالوريا؟", options:["فعّال","جيد","غير فعّال","غير واضح"] },
  { id:"F3", question:"مدى رغبتك في استخدام برنامج مساعد؟", options:["عالية","متوسطة","قليلة","لا أرغب"] },
  { id:"F4", question:"ما الخاصية الأهم؟", options:["تقييم الأداء","نقاط القوة","محاكاة الامتحانات","جميع ما سبق"] },
  { id:"F5", question:"أبرز التحديات؟", options:["كثافة المحتوى","ضعف التقييم","صعوبة الامتحان","ضغط الوقت"] },
  { id:"F6", question:"أثر النظام الجديد؟", options:["عالج مشكلات","عالج بعض","لم يغيّر","زاد المشكلات"] },
  { id:"F7", question:"مدى ملاءمته لطريقة تفكيرك؟", options:["مناسب جدًا","مناسب","يحتاج وقت","غير مناسب"] },
  { id:"F8", question:"اقتراح للتحسين؟", options:["تبسيط","تطبيقات عملية","تخفيف الصعوبة","إدارة الوقت"] }
];

/* ========= DOM ========= */
const loadingScreen = document.getElementById("loadingScreen");
const registrationForm = document.getElementById("registrationForm");
const quizContainer = document.getElementById("quizContainer");
const resultsScreen = document.getElementById("resultsScreen");

const studentForm = document.getElementById("studentForm");
const studentNameDisplay = document.getElementById("studentNameDisplay");

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionCounter = document.getElementById("questionCounter");
const progressFill = document.getElementById("progressFill");

const nextBtn = document.getElementById("nextBtn");
const finishBtn = document.getElementById("finishBtn");
const warning = document.getElementById("answerRequiredWarning");

/* ========= HIDDEN FORM ========= */
const submitForm = document.getElementById("submitForm");
const formType = document.getElementById("formType");
const formEmail = document.getElementById("formEmail");
const formAnswers = document.getElementById("formAnswers");
const formFeedback = document.getElementById("formFeedback");

/* ========= INIT ========= */
document.addEventListener("DOMContentLoaded", () => {
  loadingScreen.style.display = "none";
  registrationForm.classList.remove("hidden");

  studentForm.addEventListener("submit", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
  finishBtn.addEventListener("click", finishAction);
});

/* ========= LOAD QUESTIONS ========= */
async function loadQuestionsFromSheet() {
  const res = await fetch(APPS_SCRIPT_URL);
  const data = await res.json();
  const all = data.questions;

  const pick = s => shuffle(all.filter(q => q.Subject === s)).slice(0, 10);

  questions = shuffle([
    ...pick("ARABIC"),
    ...pick("ENGLISH"),
    ...pick("MATH"),
    ...pick("SCIENCE"),
    ...pick("IQ")
  ]).map(q => ({
    id: q.QuestionID,
    question: q.QuestionText,
    optionA: q.OptionA,
    optionB: q.OptionB,
    optionC: q.OptionC,
    optionD: q.OptionD,
    correct: q.CorrectAnswer,
    subject: q.Subject
  }));
}

/* ========= START QUIZ ========= */
async function startQuiz(e) {
  e.preventDefault();

  // بيانات الطالب
  studentNameDisplay.textContent =
    document.getElementById("studentName").value;
  studentEmail = document.getElementById("studentEmail").value;

  // إخفاء فورم التسجيل
  registrationForm.classList.add("hidden");

  // إظهار شاشة التحميل
  loadingScreen.style.display = "flex";

  // تحميل الأسئلة
  await loadQuestionsFromSheet();

  // إخفاء شاشة التحميل
  loadingScreen.style.display = "none";

  // إظهار الامتحان
  quizContainer.classList.remove("hidden");

  mode = "exam";

  // 🔥 استرجاع الإجابات المحفوظة (لو موجودة)
  const savedAnswers = localStorage.getItem(`khatwat_answers_${studentEmail}`);
  const savedIndex = localStorage.getItem(`khatwat_index_${studentEmail}`);

  if (savedAnswers) {
    answers = JSON.parse(savedAnswers);
    currentIndex = Number(savedIndex) || 0;
  } else {
    answers = [];
    currentIndex = 0;
  }

  answered = false;

  // عرض أول سؤال أو السؤال اللي الطالب وقف عنده
  showExamQuestion();
}



/* ========= SHOW EXAM ========= */
function showExamQuestion() {
  const q = questions[currentIndex];

  // عرض نص السؤال
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  // إنشاء الاختيارات
  ["A","B","C","D"].forEach(l => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `
      <div class="option-letter">${l}</div>
      <div class="option-text">${q["option" + l]}</div>
    `;
    div.onclick = () => selectExam(l, div);
    optionsContainer.appendChild(div);
  });

  // الافتراضي: لم يتم الاختيار
  answered = false;

  // 🔥 لو في إجابة محفوظة للسؤال ده
  if (answers[currentIndex]) {
    const selectedLetter = answers[currentIndex].selected;

    document.querySelectorAll(".option").forEach(opt => {
      const letter = opt.querySelector(".option-letter").textContent;
      if (letter === selectedLetter) {
        opt.classList.add("selected");
        answered = true; // يسمح بالانتقال للسؤال التالي
      }
    });
  }

  updateProgress();
  toggleButtons();
}


function selectExam(letter, el) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");

  answers[currentIndex] = {
    questionId: questions[currentIndex].id,
    subject: questions[currentIndex].subject,
    selected: letter,
    correct: questions[currentIndex].correct,
    isCorrect: letter === questions[currentIndex].correct
  };

  // 👇 حفظ تلقائي
 localStorage.setItem(answersKey(), JSON.stringify(answers));
  localStorage.setItem(indexKey(), currentIndex);

  answered = true;
}


/* ========= NAV ========= */
function nextQuestion() {
  if (!answered) return warning.classList.remove("hidden");
  currentIndex++;
  mode === "exam" ? showExamQuestion() : showFeedbackQuestion();
}

/* ========= FINISH ========= */
function finishAction() {
  if (!answered) {
    warning.classList.remove("hidden");
    return;
  }

  // ===== عند انتهاء الامتحان =====
  if (mode === "exam") {

    // إرسال إجابات الامتحان
    submitExamForm();

    // 🔥 مسح LocalStorage الخاص بالامتحان
    localStorage.removeItem(`khatwat_answers_${studentEmail}`);
    localStorage.removeItem(`khatwat_index_${studentEmail}`);

    // الانتقال لمرحلة الفيدباك
    startFeedback();

  } 
  // ===== عند انتهاء الفيدباك =====
  else {

    // إرسال الفيدباك
    submitFeedbackForm();

    // عرض النتائج
    showResults();
  }
}


/* ========= FEEDBACK ========= */
function startFeedback() {
  mode = "feedback";
  questions = feedbackQuestions;
  currentIndex = 0;
  feedbackAnswers = [];
  answered = false;
  showFeedbackQuestion();
}

function showFeedbackQuestion() {
  const q = questions[currentIndex];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((t,i)=>{
    const div = document.createElement("div");
    div.className="option";
    div.innerHTML=`<div class="option-letter">${String.fromCharCode(65+i)}</div><div class="option-text">${t}</div>`;
    div.onclick=()=>selectFeedback(t,div);
    optionsContainer.appendChild(div);
  });

  answered=false;
  updateProgress();
  toggleButtons();
}

function selectFeedback(answer, el) {
  document.querySelectorAll(".option").forEach(o=>o.classList.remove("selected"));
  el.classList.add("selected");
  feedbackAnswers[currentIndex]={ questionId:questions[currentIndex].id, answer };
  answered=true;
}

/* ========= SUBMIT FORMS ========= */
function submitExamForm() {
  formType.value = "exam";
  formEmail.value = studentEmail;
  formAnswers.value = JSON.stringify(answers);
  formFeedback.value = "";
  submitForm.submit();
}

function submitFeedbackForm() {
  const feedback = {};
  feedbackAnswers.forEach(a => feedback[a.questionId] = a.answer);

  formType.value = "feedback";
  formEmail.value = studentEmail;
  formFeedback.value = JSON.stringify(feedback);
  formAnswers.value = "";
  submitForm.submit();
}

function calculateAndShowResults() {
  const total = answers.length;               // عدد الأسئلة (50)
  const correct = answers.filter(a => a && a.isCorrect).length;
  const incorrect = total - correct;
  const percentage = total > 0
    ? Math.round((correct / total) * 100)
    : 0;

  document.getElementById("finalScore").textContent = correct;
  document.getElementById("totalQuestions").textContent = total;

  document.getElementById("correctCount").textContent = correct;
  document.getElementById("incorrectCount").textContent = incorrect;

  document.getElementById("scorePercentage").textContent = percentage + "%";
}

/* ========= RESULTS ========= */
function showResults() {
   calculateAndShowResults();
  quizContainer.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
}

/* ========= HELPERS ========= */
function updateProgress() {
  questionCounter.textContent = `السؤال ${currentIndex+1} من ${questions.length}`;
  progressFill.style.width = `${((currentIndex+1)/questions.length)*100}%`;
}

function toggleButtons() {
  currentIndex === questions.length-1
    ? (nextBtn.classList.add("hidden"), finishBtn.classList.remove("hidden"))
    : (nextBtn.classList.remove("hidden"), finishBtn.classList.add("hidden"));
}

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}



