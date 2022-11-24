let usersArr = [];



let submit = document.getElementById('submit');
submit.addEventListener('click', summary);



function summary(event){

    event.preventDefault();
    let username = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    objectFactory(username, password)
    
   
}

function objectFactory(username, password){
    let object = {
        userName: username,
        passWord: password,
        highScore: 0

    }

    let userArrFromStorage = localStorage.getItem('usersArr');
    if (userArrFromStorage !== ''){
        usersArr = JSON.parse(userArrFromStorage);
    
        const checkExistUser = usersArr.some(user => user.userName === username)
        if(checkExistUser){
            document.getElementById('existUserName').textContent = "UserName is already exist" ;
            return false;
        }
    }
    
    usersArr.push(object);
    localStorage.setItem('usersArr', JSON.stringify(usersArr));
    window.location.href= '/main/main.html';
    
}
