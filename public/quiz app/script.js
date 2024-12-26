const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

async function loadQuiz() {
    const response = await fetch("questions.json");
    const questions = await response.json();

    questions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        questionElement.dataset.answer = q.answer;

        const questionText = document.createElement("h3");
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionElement.appendChild(questionText);

        const optionsList = document.createElement("ul");
        optionsList.classList.add("options");

        q.options.forEach((option, i) => {
            const optionItem = document.createElement("li");

            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question${index}`;
            optionInput.value = i;
            optionItem.appendChild(optionInput);

            const optionLabel = document.createElement("label");
            optionLabel.textContent = option;
            optionItem.appendChild(optionLabel);

            optionsList.appendChild(optionItem);
        });

        questionElement.appendChild(optionsList);
        quizContainer.appendChild(questionElement);
    });

    submitButton.style.display = "block";
}

function calculateResult() {
    let score = 0;
    let attemptedCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    const questions = document.querySelectorAll(".question");
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(
            `input[name="question${index}"]:checked`
        );
        const correctAnswer = parseInt(q.dataset.answer - 1);
        const options = q.querySelectorAll("input");

        options.forEach((option) => {
            option.disabled = true;
        });

        const correctOption = q.querySelector(
            `input[name="question${index}"][value="${correctAnswer}"]`
        ).nextSibling;
        const correctAnswerElement = document.createElement("div");
        correctAnswerElement.classList.add("correct-answer");
        correctAnswerElement.textContent = `Correct Answer: ${correctOption.textContent}`;
        q.appendChild(correctAnswerElement);

        if (selectedOption) {
            attemptedCount++;
            if (parseInt(selectedOption.value) === correctAnswer) {
                score++;
                correctCount++;
            } else {
                incorrectCount++;
                q.classList.add("incorrect");
            }
        }
    });

    resultContainer.innerHTML = `
    <p>Total Score: ${score} out of ${questions.length}</p>
    <p>Number of Attempted Questions: ${attemptedCount}</p>
    <p>Number of Correct Questions: ${correctCount}</p>
    <p>Number of Incorrect Questions: ${incorrectCount}</p>
  `;
}



// var startTime; // to keep track of the start time
// var stopwatchInterval; // to keep track of the interval
// var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

// function startStopwatch() {
//     if (!stopwatchInterval) {
//         startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
//         stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
//     }
// }

// function stopStopwatch() {
//     clearInterval(stopwatchInterval); // stop the interval
//     elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
//     stopwatchInterval = null; // reset the interval variable
// }

// function updateStopwatch() {
//     var currentTime = new Date().getTime(); // get current time in milliseconds
//     var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
//     var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
//     var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
//     var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours
//     var displayTime = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds); // format display time
//     document.getElementById("stopwatch").innerHTML = displayTime; // update the display


// }

// function pad(number) {
//     // add a leading zero if the number is less than 10
//     return (number < 10 ? "0" : "") + number;
// }
// onload(startStopwatch());

submitButton.addEventListener("click", calculateResult);

// Load the quiz on page load
loadQuiz();