function send_informations(){
    var nickname = document.querySelector("#nickname").value.trim();
    var username = document.querySelector("#username").value.trim();
    var bio = document.querySelector('#bio').value.trim();
    var passwrd = document.querySelector("#password").value.trim();
    var confirm = document.querySelector("#confirm").value.trim();
    
    if(confirm == passwrd){
        fetch('/create_profile', { method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nickname, username,passwrd,bio }),
        });
        window.location.href = '/'
    }else{
        alert("as senhas não coincidem")
    }
}