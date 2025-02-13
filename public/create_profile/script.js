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
}