async function get_login(){
    const username = document.querySelector('#username').value;
    const passwrd = document.querySelector('#password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username,passwrd})
    });

    const data = await response.json();

    console.log(data)
    console.log(response.ok)
    if(response.ok && data.username != 'admin'){
        sessionStorage.setItem('username',username);
        window.location.href = '/home';
    }else if (!response.ok){
        alert(data.message)
    }else if(data.username != 'admin'){
        window.location.href = '/admin';
    }
}