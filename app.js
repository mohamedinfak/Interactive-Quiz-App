const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      correct: 2, // Index of the correct answer
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "George Orwell", "J.K. Rowling"],
      correct: 0,
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correct: 2,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      correct: 2,
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  const feedback = [];
  
  // Elements
  const questionElement = document.getElementById("question");
  const optionsForm = document.getElementById("options-form");
  const nextButton = document.getElementById("next-btn");
  const resultBox = document.getElementById("result-box");
  const finalScoreElement = document.getElementById("final-score");
  const feedbackList = document.getElementById("feedback-list");
  const restartButton = document.getElementById("restart-btn");
  
  // Show Question
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    // Clear previous options
    optionsForm.innerHTML = "";
  
    // Create radio buttons for options
    currentQuestion.options.forEach((option, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
  
      input.type = "radio";
      input.name = "option";
      input.value = index;
      input.id = `option-${index}`;
  
      // Link the label to the input
      label.htmlFor = `option-${index}`;
      label.textContent = option;
  
      input.addEventListener("change", () => {
        nextButton.disabled = false; // Enable Next button when an option is selected
      });
  
      optionsForm.appendChild(input);
      optionsForm.appendChild(label);
      optionsForm.appendChild(document.createElement("br")); // Line break
    });
  
    nextButton.disabled = true; // Disable Next button initially
  }
  
  // Check Answer and Add Feedback
  function checkAnswer() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption) {
      const selectedIndex = parseInt(selectedOption.value);
      const selectedAnswer = currentQuestion.options[selectedIndex];
      const correctAnswer = currentQuestion.options[currentQuestion.correct];
  
      // Create a new feedback item
      const feedbackItem = document.createElement("li");
      feedbackItem.textContent = `Question: ${currentQuestion.question}
                                 Correct Answer: "${correctAnswer}"
                                 Your Answer: "${selectedAnswer}"`;
  
      // Add feedback with the correct or wrong class
      if (selectedIndex === currentQuestion.correct) {
        feedbackItem.classList.add("correct");
        feedback.push(`Question: ${currentQuestion.question}
                      Correct Answer: "${correctAnswer}"
                      Your Answer: "${selectedAnswer}" - Correct!`);
        score++;
      } else {
        feedbackItem.classList.add("wrong");
        feedback.push(`Question: ${currentQuestion.question}
                      Correct Answer: "${correctAnswer}"
                      Your Answer: "${selectedAnswer}" - Wrong!`);
      }
  
      feedbackList.appendChild(feedbackItem); // Append feedback item to the list
    }
  }
  
  // Show Result
  function showResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    resultBox.classList.remove("hidden");
  
    finalScoreElement.textContent = `${score} out of ${questions.length}`;
  
    // Display feedback
    feedbackList.innerHTML = "";
    feedback.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("feedback-item");
      li.textContent = item;
      feedbackList.appendChild(li);
    });
  
   
  }
  
  // Restart Quiz
  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    feedback.length = 0; // Clear feedback
    resultBox.classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    showQuestion();
  }
  
  // Event Listeners
  nextButton.addEventListener("click", () => {
    checkAnswer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();

    } else {
      showResult();

    }
  });
  
  restartButton.addEventListener("click", restartQuiz);
  
  // Initialize Quiz
  showQuestion();
  
 