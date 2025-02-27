async function generate_forum() {
    const username = sessionStorage.getItem('username')
    const href = window.location.href;
    const id = href.split("http://localhost/forum/")[1];
    const response = await fetch(`/forum/${id}`,{
        method:"POST", 
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({username})
    })
    const forum_att = await response.json();
    console.log(forum_att)
    const title = document.querySelector('#name');
    const owner = document.querySelector('#owner')
    title.textContent = forum_att.name;
    owner.textcontent = `por: ${forum_att.owner_nickname}`;
}

async function get_forum_posts() {
    const href = window.location.href;
    const id = href.split("http://localhost/forum/")[1];
    const response = await fetch('/forum_feed',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({id})});
    const posts = await response.json();
    const feed = document.querySelector('main');
    
    posts.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('post');
        div.innerHTML = `
            <header>
                <small>por: ${item.sender_nickname}</small>
                <h1>${item.title}</h1>
                <hr>
            </header>
            <p>${item.content}</p>
            <footer>
                <small>do fórum: <a href="/forum/${item.forum_id}">${item.forum_name}</a></small>
            </footer>`
        feed.appendChild(div);
    });
}

get_forum_posts()

generate_forum()