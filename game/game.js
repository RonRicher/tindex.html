const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreDiv = document.getElementById('score');
const correctAudio = document.getElementById('correctAudio');
const wrongAudio = document.getElementById('wrongAudio');
const nextBonus = document.getElementById('changeQuestion');
const revealAnswer = document.getElementById('revealAnswer');
let counter = 0;
let tenSeconds = 10;
let my = null;
let userOnline = JSON.parse(localStorage.getItem('onlineUser'));
let usersArr = JSON.parse(localStorage.getItem('usersArr'));

let highScore = document.getElementById('highScore');
highScore.textContent = 'High Score: ' + userOnline.highScore;

let score = 0;
let questions;
const questionsFromStorage = localStorage.getItem('allQuestions');
if (questionsFromStorage !== '') {
  questions = JSON.parse(questionsFromStorage);
}



nextBonus.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
  nextBonus.style.display ='none';
})

revealAnswer.addEventListener('click', ()=>{
  console.log('hi event')
  revealAnswer.style.display ='none';
  nextBonus.classList.add('hide');
  setStatusClass(document.body, true);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  correctAudio.play();
  score += 200;
  scoreDiv.textContent = 'Score: ' + score;
  nextButton.classList.remove('hide');})



let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  
  counter++;
  if(counter === 8){
    gameOver();
  }
  currentQuestionIndex++;
  setNextQuestion();
  nextBonus.classList.remove('hide');
  revealAnswer.classList.remove('hide');
})

function startGame() {
  runTimer();
  revealAnswer.classList.remove('hide');
  nextBonus.classList.remove('hide');
  
  scoreDiv.textContent = 'Score: '+ score;
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  for (let i = 0; i < questions.length; i++) {
    questions[i].answers.sort(() => Math.random() - .5)
  }
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {

  resetState()

  showQuestion(shuffledQuestions[currentQuestionIndex])
  runTimer();
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
  console.log('reset');
  clearStatusClass(document.body)
  nextButton.classList.add('hide');
  
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
   console.log('select')
  const selectedButton = e.target
  console.log(selectedButton);
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {

    nextButton.classList.remove('hide')
    nextBonus.classList.add('hide');
    revealAnswer.classList.add('hide');
  } else {
    startButton.innerText = 'התחל מחדש'
    startButton.classList.remove('hide')
  }
  if (selectedButton.className === 'btn correct') {
    correctAudio.play();
    score += questions[Math.floor(Math.random() * questions.length)].score;
    scoreDiv.textContent = 'Score: ' + score;
  }
  else {
    wrongAudio.play();
    if (score >= 200) {
      score -= 200;
    }
    else {
      score = 0;
    }
    scoreDiv.textContent = 'Score: ' + score;
  }
  
  
}

function setStatusClass(element, correct) {

  clearStatusClass(element);

  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')

  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
  clearInterval(my);
}






function startTimer(duration, display) {
  console.log('timer')
  let timer = duration, minutes, seconds;
  

  let countDown = function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;
      console.log(display.textContent)
     
      if (--timer < 0) {
        display.textContent = ''
        clearInterval(my)
      }
  }
 
  const my = setInterval(countDown, 1000);

}
 let runTimer = function () {
  let tenSeconds = 10,
      display = document.querySelector('#time');
  startTimer(tenSeconds, display);

}


function gameOver(){
  document.querySelector('.container').style.display='none';
  document.getElementById('time').style.display = 'none';

  let winning = document.createElement('h1');
  winning.style.fontSize = '150px';
  
  winning.style.backgroundColor = 'white';
  winning.style.borderRadius = '12px';
  winning.style.padding = '20px';
  document.body.appendChild(winning);
  if(userOnline.highScore < score){
    userOnline.highScore = score;
    localStorage.setItem('onlineUser', JSON.stringify(userOnline));
    for(let i = 0; i < usersArr.length; i++){
      if(usersArr[i].userName === userOnline.userName){
        usersArr[i].highScore = score;
        localStorage.setItem('usersArr', JSON.stringify(usersArr));
      }
      

    }
    
  }
  if(score > 1000){
  winning.textContent = 'אתה אלוף!';
  winning.style.color = 'lime';
  }
  else if(score > 500){
  winning.textContent = 'תשתפר!';
  winning.style.color = 'gold';
  }
  else{
    winning.textContent = 'אתה מודח!';
    winning.style.color = 'red';
  }

}

