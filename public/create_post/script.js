async function public_post() {
    const username = sessionStorage.getItem('username');
    console.log(username)
    const select = document.querySelector('#foruns').value;
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    const response = await fetch('/public_post',{method:'POST', 
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({username:username,select,title,content})})
    
    if(response.ok){
        window.location.reload()
        window.location.href = '/home'
    }
}

async function get_all_foruns(){
    const response = await fetch('/get_all_foruns',{method:'POST'});
    const data = await response.json();
    const select = document.querySelector('#foruns');
    
    data.forEach(forun => {
        const element = document.createElement('option');
        element.textContent = forun.name;
        element.value = forun.id;
        select.appendChild(element)
    });
}

get_all_foruns()