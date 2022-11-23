const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreDiv = document.getElementById('score');

let score = 0;

let questions;
const questionsFromStorage = localStorage.getItem('allQuestions');
if(questionsFromStorage !== ''){
questions = JSON.parse(questionsFromStorage);
}


let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  scoreDiv.textContent = score;
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  for(let i = 0; i < questions.length; i++){
  questions[i].answers.sort(() => Math.random() - .5)}
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState()
  
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
console.log(questions)
function showQuestion(question) {
  questionElement.innerText = question.question
 
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct

    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  console.log(selectedButton);
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'התחל מחדש'
    startButton.classList.remove('hide')
  }
  if(selectedButton.className === 'btn correct'){
    score += questions[Math.floor(Math.random() * questions.length)].score;
    scoreDiv.textContent = score;
  }
  else{
    if(score >= 200){
    score -= 200;}
    else{
      score = 0;
    }
    scoreDiv.textContent = score;
  }
}

function setStatusClass(element, correct) {

  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')

  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  

  let countDown = function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      console.log(display.textContent)
     
      if (--timer < 0) {
       clearInterval(my)
      }
  }
 const my = setInterval(countDown, 1000);
 
}


nextButton.addEventListener('click' , function () {
  let tenSeconds = 10,
      display = document.querySelector('#time');
  startTimer(tenSeconds, display);
  
});
