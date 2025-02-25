const username = sessionStorage.getItem("username");

async function create_forum() {
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    console.log('oi')

    try{
        const response = await fetch('/create_forum_post',{
            method:'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name,description,username})
        })
    
        console.log(response.status)
        console.log('oi2')
        window.location.href = '/my_foruns/'+username;
    }catch(error){
        console.log(error)
    }
}