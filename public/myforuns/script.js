async function get_foruns() {
    const username = sessionStorage.getItem('username');

    const response = await fetch('/created_foruns',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({username})
    });
    const foruns = await response.json();
    const feed = document.querySelector('main');
    
    console.log(foruns)
    foruns.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('forum');
        div.innerHTML =`<header>
                <a href="/forum/${item.id}"><h1>${item.name}</h1></a>
                <small>criado por ${item.owner_nickname}</small>
                <hr>
            </header>
            <article>
                <h3>descrição:</h3>
                <p>${item.description}</p>
            </article>`
        feed.appendChild(div);
    });
}

get_foruns()