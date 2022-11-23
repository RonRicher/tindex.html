let questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: 'Who is the best YouTuber?',
      answers: [
        { text: 'Web Dev Simplified', correct: true },
        { text: 'Traversy Media', correct: true },
        { text: 'Dev Ed', correct: true },
        { text: 'Fun Fun Function', correct: true }
      ]
    },
    {
      question: 'Is web development fun?',
      answers: [
        { text: 'Kinda', correct: false },
        { text: 'YES!!!', correct: true },
        { text: 'Um no', correct: false },
        { text: 'IDK', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
      ]
    }
  ]

const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const add = document.getElementById('add');
const inputs = document.querySelectorAll('input')

add.addEventListener('click', createNewQuestion);

function returnToGame(){
window.location.href = '/game/game.html'
}


function sendToLocalStorage(){
    add.removeEventListener('click',  sendToLocalStorage)
    add.addEventListener('click', returnToGame)
    add.value = 'חזור למשחק'
    console.log(questions)
    if(localStorage.getItem('allQuestions') === ''){
        localStorage.setItem('allQuestions',JSON.stringify(questions))
    }else{
        const Questions = JSON.parse(localStorage.getItem('allQuestions'))
        const allQuestions = Questions.concat(questions) 
        localStorage.setItem('allQuestions',JSON.stringify(allQuestions))
    }
    
    questions = []
}

localStorage.setItem('allQuestions', [])

function createNewQuestion(){
        for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ''){
            return
        }
       }
    if(questions.length === 2){
        add.removeEventListener('click', createNewQuestion)
        add.value = 'הוסף שאלות למאגר'
        alert('לא ניתן להוסיף יותר שאלות')
   
        add.addEventListener('click', sendToLocalStorage)
    }
    questions.push({
        question: question.value,
        answers: [
          { text: answer1.value, correct: true },
          { text: answer2.value, correct: false },
          { text: answer3.value, correct: false },
          { text: answer4.value, correct: false }
        ]

    })
    question.value = ''
    answer1.value = ''
    answer2.value = ''
    answer3.value = ''
    answer4.value = ''
    

    console.log(questions)

}


