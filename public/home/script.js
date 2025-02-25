const username = sessionStorage.getItem('username');

async function generate_feed() {
    const response = await fetch('/feed',{
        method:'GET',
        headers: { 'Content-Type': 'application/json' }});
    const posts = await response.json();
    const feed = document.querySelector('main');
    
    console.log(posts)
    console.log('rapaz')
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

async function href_foruns() {
    const href = '/my_foruns/'+username;
    console.log(href)
    const amyforuns = document.querySelector('#myforuns');
    amyforuns.href = href;
}

async function href_post() {
    window.location.href = '/create_post'
}

href_foruns()
generate_feed()