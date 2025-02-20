const { query } = require("express");

function send_informations(){
    var nickname = document.querySelector("#nickname").value.trim();
    var email = document.querySelector("#email").value.trim();
    var password = document.querySelector("#password").value.trim();
    var confirm = document.querySelector("#confirm").value.trim();
    
    if(confirm == password){
        fetch('/create_profile', { method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nickname, email,password })
        });
    }else{
        alert("as senhas não coincidem")
    }

    const container = querySelector('div')
    const p = document.createElement('h1')
    p.textContent = 'COMI O CU DE QUEM ESTÁ LENDO'
    container.appendChild(p)

}