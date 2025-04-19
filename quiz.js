const startBtn = document.querySelector(".btn");
const startScreen = document.querySelector(".start-quiz");
const questionContainer = document.querySelector(".question-container");
const quizDiv = document.querySelector(".quiz");
const nextBtn = document.querySelector(".next-btn");
const scoreText = document.querySelector(".score");

// Sample Questions
const questions=[
    {
        question: "what is the full form of HTML?",
        options: [
            "A. Hyper Type Multi Language", 
            "B. Hyper Text Multiple Language",
            "C. Hyper Text Markup Language", 
            "D. Home Text Multiple Language"
        ],
        answer: "C. Hyper Text Markup Language"
    },

    {
        question: "what does CSS stand for?",
        options: [
            "A. Cascading Style Sheet", 
            "B. Cute Style Sheet",
            "c. Computer Style Sheet", 
            "D. Common Style Sheet"
        ],
        answer: "A. Cascading Style Sheet"
    },

    {
        question: "what is the full form of PHP?",
        options: [
            "A. Hypertext Preprocessor", 
            "B. Hometext programing",
            "c. Hypertext preprograming", 
            "D. Programing Hypertext Preprocessor"
        ],
        answer: "A. Hypertext Preprocessor"
    },

    {
        question: "what does SQL stand for?",
        options: [
            "A. Strength Query Language", 
            "B. Stylesheet Query Language",
            "c. Science Question Language", 
            "D. Structured Query Laanguage"
        ],
        answer: "D. Structured Query Laanguage"  
    },

    {
        question: "what is the full form of XML?",
        options: [
            "A. Execellent Multiple Language", 
            "B. Explore Multiple Language",
            "c. Extra Markup Language", 
            "D. Extensible Markup Language"
        ],
        answer: "D. Extensible Markup Language"
    },
];

let currentQuestionIndex = 0;
let score = 0;

// Function to start quiz
function startQuiz() {
    startScreen.style.display = "none";  
    questionContainer.style.display = "block";  
    loadQuestion();
}

// Function to load questions dynamically
function loadQuestion() {
    nextBtn.style.display = "none"; // Hide next button initially

    const currentQuestion = questions[currentQuestionIndex];
    quizDiv.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.options.map(option => 
                `<li class="option">${option}</li>`).join("")}
        </ul>
    `;

    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", () => checkAnswer(option));
        option.style.backgroundColor = ""; // Reset background
        option.style.pointerEvents = "auto"; // Enable clicking
    });
}

// Function to check answer
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption.textContent === correctAnswer) {
        selectedOption.style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        score++;
    } else {
        selectedOption.style.backgroundColor = "rgba(255, 0, 0, 0.6)";
    }

    // Disable all options after selection
    document.querySelectorAll(".option").forEach(option => {
        option.style.pointerEvents = "none";
        if (option.textContent === correctAnswer) {
            option.style.backgroundColor = "green";
        }
    });

    nextBtn.style.display = "block"; // Show next button only after selection
}

// Function to load next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        quizDiv.innerHTML = `
            <h2>Quiz Completed!</h2>
            <p class="score-message">Your score: ${score}/${questions.length}</p>
            <p class="thank-you-message">Thank you for completing the quiz! 🎉</p>
        `;
        nextBtn.style.display = "none"; // Hide Next button at the end
        scoreText.style.display = "none";// Hide score at the end
    }
    
    scoreText.textContent = `Score: ${score}/${questions.length}`;
}

// Event Listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
