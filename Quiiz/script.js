
const quizData = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
      answer: 'Jupiter',
    },
    {
      question: 'Which language is primarily used for web development?',
      options: ['Python', 'JavaScript', 'Java', 'C++'],
      answer: 'JavaScript',
    },
    {
      question: 'Which company developed the Windows operating system?',
      options: ['IBM', 'Apple', 'Microsoft', 'Google'],
      answer: 'Microsoft',
    },
    {
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'India', 'Japan', 'Korea'],
      answer: 'Japan',
    },
    {
      question: 'Who wrote the novel "1984"',
      options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Philip K. Dick'],
      answer: 'George Orwell',
    },
    
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  const loginForm = document.getElementById('login-form');
  const loginButton = document.getElementById('login-btn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  
  function createQuestionSlide(questionData) {
    const questionSlide = document.createElement('div');
    questionSlide.className = 'question-slide';
  
   
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = questionData.question;
    questionSlide.appendChild(questionElement);
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    shuffledOptions.forEach(option => {
      const label = document.createElement('label');
      label.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = option;
  
      const optionText = document.createTextNode(option);
  
      label.appendChild(radio);
      label.appendChild(optionText);
      optionsElement.appendChild(label);
    });
  
    questionSlide.appendChild(optionsElement);
  
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.className = 'button';
    submitButton.addEventListener('click', checkAnswer);
    questionSlide.appendChild(submitButton);
  
    return questionSlide;
  }
  
function createQuestionSlide(questionData) {
    const questionSlide = document.createElement('div');
    questionSlide.className = 'question-slide';
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = questionData.question;
    questionSlide.appendChild(questionElement);
  
    
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    shuffledOptions.forEach(option => {
      const label = document.createElement('label');
      label.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = option;
  
      const optionText = document.createTextNode(option);
  
      label.appendChild(radio);
      label.appendChild(optionText);
      optionsElement.appendChild(label);
    });
  
    questionSlide.appendChild(optionsElement);
  
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.className = 'button';
    submitButton.addEventListener('click', checkAnswer);
  
    return questionSlide;
  }
  
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionSlide = createQuestionSlide(questionData);
  
   
    while (quizContainer.firstChild) {
      quizContainer.removeChild(quizContainer.firstChild);
    }
  
    
    quizContainer.appendChild(questionSlide);
    quizContainer.appendChild(submitButton); 
  }
  
  function displayNextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
  
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      displayNextQuestion();
    }
  }
  
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
 
  function login() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (username === 'user' && password === 'password') {
      alert('Login successful!');
      loginForm.style.display = 'none';
      quizContainer.style.display = 'block';
      displayQuestion(); 
      submitButton.style.display = 'inline-block';
      retryButton.style.display = 'none';
      showAnswerButton.style.display = 'none';
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }
  
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    resultContainer.innerHTML = '';
    displayQuestion();
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
  }
  
  
  function showAnswer() {
    submitButton.style.display = 'none';
    quizContainer.style.display = 'none';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
          <p>
            <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
            <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
            <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
          </p>
        `;
    }
  
    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
      `;
    resultContainer.style.display = 'block';
  }
  
  
  loginButton.addEventListener('click', login);
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);