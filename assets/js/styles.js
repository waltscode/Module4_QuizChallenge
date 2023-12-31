// Create the questions that the user will be presented with while taking the quiz
// put them in an array and give 'true' for correct answers and 'false' for the rest
var questions = [
    {
        question: 'What is the correct way to declare a variable in JavaScript?',
        answers: [
            { text: "variable x", correct: false },
            { text: "I Declare that x", correct: false },
            { text: "x = var", correct: false },
            { text: "var x", correct: true },
        ]
    },
    {
        question: 'What is the purpose of the "console.log()" function in JavaScript?',
        answers: [
            { text: "It displays a message in an alert", correct: false },
            { text: "It logs messages in the console for debugging", correct: true },
            { text: "Creates a variable", correct: false },
            { text: "It prints text to the webpage", correct: false },
        ]
    },
    {
        question: 'Which of the following is a primitive data type in JavaScript?',
        answers: [
            { text: "Array", correct: false },
            { text: "Object", correct: false },
            { text: "Function", correct: false },
            { text: "String", correct: true },
        ]
    },
    {
        question: 'What does the "DOM" stand for in the context of web development with JavaScript?',
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Mixture", correct: false },
            { text: "Delta Omega Mega", correct: false },
            { text: "Document Order Mechanism", correct: false },
        ]
    }
];

// The elements created are for the questions and answers - linking them to the HTML document's classes - ALLOWING THEM TO HAVE FUNCTION
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

// These elements are created for the start button on the main page that launches the quiz - ALLOWING THEM TO HAVE FUNCTION
const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');

// create an element for the timer on the HTML page - ALLOWING THEM TO HAVE FUNCTION
const timerElement = document.getElementById('timer');
const scoreForm = document.getElementById('score-form');

// create a variable for the timer - giving it an amount on the clock - BASICALLY setting the timer to 40 and telling it to countdown
let timeRemaining = 40;
let countdown;
// adding an eventlistener to the START BUTTON in order to launch the quiz and remove the display:none setting on the quiz  container - MAKING IT VISIBLE - NOTE 1000 is for miliseconds(one second)
startButton.addEventListener('click', () => {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    timerElement.style.display = 'block';
    resetTimer();
    const countdown = setInterval(function () {
        timeRemaining--;
        timerElement.textContent = `Timer: ${timeRemaining}`;
        if (timeRemaining <= 0 || currentQuestionIndex[3]) {
            clearInterval(countdown);
            timerElement.textContent = `Timer: 0`;
            alert('Oops! Out of Time!');
            showScore()
        }

    }, 1000);
    startQuiz();
});

// there needs to be a function for the TIMER TO RESET WHEN THE QUIZ RESETS
function resetTimer() {
    clearInterval(countdown);
    timeRemaining = 40;
    timerElement.textContent = `Timer: ${timeRemaining}`;
}

// telling the array of questions to START AT 0 and the go up by +1 FROM THERE -  SAME THING FOR THE SCORE - you dont want your score to be stuck at 3 or something
let currentQuestionIndex = 0;
let score = 0;

// a function to START THE QUIZ - Run everything basically - we need it to run the function of SHOWING THE QUESTIONS to the user and STARTING THE CLOCK
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    resetTimer();
}

// this is the function that pulls the questions from the array created above - 'question' is being populated from it's index 0 +1 +1 +1 etc. - the '_ ' string implies fill in the currentQuestion with 'question' array
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    // this function is being used to check the value of current question with 'answers' value of either TRUE or FALSE - true means correct! 
    // Also create an element called button that reveals the possible answers to the question being grabbed. adding a class of 'btn' that has css elements associated - if TRUE = correct
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click', selectAnswer);
    });
    document.getElementById('score-form').style.display = 'none';
    // ensuring that the score-form is not being shown DURING THE QUIZ
}

// you want to reset the state of the UI, AFTER a user has submitted an answer and you're preparing for the next question.
function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// We want a variable that will allow a user to choose ANY EVENT (e) of the buttons(answers)
// we want to create a variable that provides the logic on wether the button being clicked is 'TRUE' (correct) - basically iscorrect is the right answer everything ELSE is wrong
// if the user chooses a value that is ELSE the timer will -10 from the interval(timer) also if the time remaining is less than 0 or 0
// also adding a css effect forEach(button) - if the dataset is TRUE then class of 'correct' - Green will be revealed after click
// after the click the Next button will appear prompting the user to load the next question in the quiz 
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    score++;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
        score--;

        timeRemaining -= 10;
        if (timeRemaining < 0) {
            timeRemaining = 0;
        }
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// we need to create a function that keeps track of the score of the quiz and is then displayed at the end of the quiz 
// this score is going to then be saved in the highscore container and saved locally 
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    const playAgainButton = document.createElement("button");
    playAgainButton.innerHTML = "Play Again";
    playAgainButton.classList.add('btn', 'play-again-btn');
    answerButtons.appendChild(playAgainButton);

    const submitScoreButton = document.createElement("button");
    submitScoreButton.innerHTML = "Submit Score";
    submitScoreButton.classList.add('btn', 'submit-score-btn');
    answerButtons.appendChild(submitScoreButton);

    submitScoreButton.addEventListener('click', () => {
        const scoreForm = document.getElementById('score-form');
        scoreForm.style.display = 'block';
        playAgainButton.style.display = 'none';
        submitScoreButton.style.display = 'none';

    });

    // there needs to be logic to what happens when the user clicks the PLAY AGAIN BUTTON - essentially we need remove the content on screen and bring back the start quiz button
    playAgainButton.addEventListener('click', () => {
        // startQuiz();
        // resetTimer();
        startContainer.style.display = 'flex';
        highscoreButton.style.display = 'block';
        timerElement.style.display = 'none';

    });

    // this will show the PLAY AGAIN and the SUBMIT SCORE buttons
    playAgainButton.style.display = 'block';
    submitScoreButton.style.display = 'block';
}



// event listener on the 'submit' button that pops up on the form when clicked
// (e).prevent default is used to prevent the default function of submitting form - STOPPING THE PAGE FROM REFRESHING 
// username.value is being used to take the information entered in that field and saving it as 'username' value
// function saveHighscore is being used to take the 'username' and 'score' together for the highscore list
// choose what containers you want to see and NOT SEE
scoreForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    saveHighScore(username, score);
    alert('Score submitted successfully!');
    startContainer.style.display = 'flex';
    highscoreButton.style.display = 'block';
    timerElement.style.display = 'none';
    startQuiz();
});

// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];: This line retrieves the 'highScores' from the browser's local storage.
//  If there are no high scores stored yet (or if there is an issue parsing them from JSON), it initializes an empty array ([]).
//  The retrieved high scores are stored in the variable highScores.
// highScores.sort((a, b) => b.score - a.score);: This line sorts the highScores array in descending order based on the 'score' property of each entry.
//  This means that the highest scores will be at the beginning of the array after the sorting is complete.
// the saveHighScore function is responsible for updating the high scores STORED IN THE LOCAL STORAGE
function saveHighScore(username, score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ username, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// declaring the variables for the highscore feature in the HTML - the container, the button, the list, etc. 
const highscoreButton = document.getElementById('highscoreButton');
const highscoresContainer = document.getElementById('highscores-container');
const highscoresList = document.getElementById('highscores-list');
const closeHighscoresButton = document.getElementById('close-highscores');


// just logic for what happens when you click the highscore button - WHAT IS SEEN AND WHAT IS NOT
highscoreButton.addEventListener('click', showHighscores);
closeHighscoresButton.addEventListener('click', () => {
    hideHighscores();
    startContainer.style.display = 'flex';
    highscoreButton.style.display = 'block';
    quizContainer.style.display = 'none';
    timerElement.style.display = 'none';
});

// we need a function for showing the highscores in a list format - basically retrieving the info from the local storage and then listing them accordingly
function showHighscores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highscoresList.innerHTML = '';

    highScores.forEach((score, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${score.username}: ${score.score}`;
        highscoresList.appendChild(listItem);
    });

    // this is again what you will see when the function showHighscores() runs
    highscoresContainer.style.display = 'block';
    highscoreButton.style.display = "none";
    timerElement.style.display = "none";
    quizContainer.style.display = "none";
    startContainer.style.display = "none";
}

// this is the function that occurs when you click close on the highscore section and ofcourse while anything else is running 
// the content NEEDS TO EXIST WITHOUT BEING SEEN EXCEPT WHEN THE INTENTION IS TO VIEW IT
function hideHighscores() {
    highscoresContainer.style.display = 'none';
}

// this is function that tells when to show the 'NEXT' button and what it's supposed to do
// we need the next button to remove the previous question and reveal the next one
// if the question index is less than the questions length - NEXT QUESTION 
// if the question index is equal to length or NOT LESS THAN - the showScore() function runs
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.innerHTML = "Next";
    } else {
        showScore();
        nextButton.innerHTML = "Test button for End"
        timeRemaining = 40;
    }
}
// this is being used to give the next button a click feature - WHEN CLICKED, 'handleNextButton()' function runs!
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        showScore();
        resetTimer();
        resetQuiz();
    }
});

// we need to tell the computer to NOT ONLY reset the question loop, 
// we need QUESTION TO START BACK AT 0 INDEX and SCORE TO START BACK AT 0 
// without adding the display stuff the quiz just goes back into action, I want the start screen green button to show!
function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    timerElement.style.display = 'none';
    nextButton.innerHTML = 'Next';
}


startQuiz();