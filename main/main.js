let arrUsers = JSON.parse(localStorage.getItem('usersArr'));
console.log(arrUsers);

let submit = document.getElementById('submit');

submit.addEventListener('click', logIn)


function logIn(event) {
    event.preventDefault();
    let userNameLogIn = document.getElementById('userName').value;
    let passwordLogIn = document.getElementById('password').value;

    for (let i = 0; i < arrUsers.length; i++) {
        if (userNameLogIn === arrUsers[i].userName && passwordLogIn === arrUsers[i].passWord) {
            let object = arrUsers[i];
            localStorage.setItem('onlineUser', JSON.stringify(object));
            window.location.href= '/gamesPage/games.html';
            break
        }

        document.getElementById('wrongData').textContent = 'הפרטים שהזנת שגויים'
        
    }

       
}

