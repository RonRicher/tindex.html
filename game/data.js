let questions = []

const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const add = document.getElementById('add');

add.addEventListener('click', createNewQuestion);

const allQuestions = []


function sendToLocalStorage(){
    add.removeEventListener('click',  sendToLocalStorage)
    // add.addEventListener('click', returnToGame)
    add.textContent = 'חזור למצב משחק'
    allQuestions.push(questions)
    questions = []
    console.log(questions)
    console.log(allQuestions)
    localStorage.setItem('allQuestions',JSON.stringify(allQuestions))
}

function createNewQuestion(){
    if(questions.length === 4){
        add.removeEventListener('click', createNewQuestion)
        add.textContent = 'הוסף שאלות למאגר'
        alert('לא ניתן להוסיף יותר שאלות')
        add.addEventListener('click', sendToLocalStorage)
    }
    questions.push({
        question: question.value,
        answers: [
          { text: answer1.value, correct: true },
          { text: answer2.value, correct: false }
        ]

    })
    question.value = ''
    answer1.value = ''
    answer2.value = ''
    console.log(questions)

}


