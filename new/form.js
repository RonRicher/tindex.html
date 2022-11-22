let submit = document.querySelector('#submit');
let usersArr = [];
submit.addEventListener('click', summary);


function summary(){
    
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    objectFactory(username, password);
    windows.location='/new/main.html'
    console.log(document.getElementById('userName').value)
    console.log(document.getElementById('password').value)
}

function objectFactory(username, password){
    
    let object = {
        userName: username,
        passWord: password
    }
    for(let i = 0; i < usersArr.length; i++){
        if(this.userName === usersArr[i].userName){
            return false;
        }
    }

    usersArr.push(object);
    
}