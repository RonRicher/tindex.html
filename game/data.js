let questions = []

const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const add = document.getElementById('add');
const inputs = document.querySelectorAll('input')

add.addEventListener('click', createNewQuestion);


function sendToLocalStorage(){
    add.removeEventListener('click',  sendToLocalStorage)
    add.addEventListener('click', createNewQuestion)
    add.value = ' הוסף שאלה'
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
    if(questions.length === 4){
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


