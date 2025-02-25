async function deleteuser(id) {
    const response = await fetch('/adm_delete_user',{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:id})
    })
    if(response.ok){
        window.location.reload()
    }
}

async function saveuser(id) {
    const username = document.querySelector(`#${id} > #username > input`).value;
    const nickname = document.querySelector(`#${id} > #nickname > input`).value;
    const password = document.querySelector(`#${id} > #password > input`).value;
    const bio = document.querySelector(`#${id} > #bio > input`).value;

    const response = await fetch('/adm_edit_user',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({username,nickname,password,bio,id:id})
    })

    const newprofile = await response.json();

    const username_new = document.querySelector(`#${id} > #username`);
    const nickname_new = document.querySelector(`#${id} > #nickname`);
    const password_new = document.querySelector(`#${id} > #password`);
    const bio_new = document.querySelector(`#${id} > #bio`);

    username_new.innerHTML = `${newprofile.username}`;
    nickname_new.innerHTML = `${newprofile.nickname}`;
    password_new.innerHTML = `${newprofile.passwrd}`;
    bio_new.innerHTML = `${newprofile.bio}`;

}

async function edituser(id) {

    const username = document.querySelector(`#${id} > #username`);
    const nickname = document.querySelector(`#${id} > #nickname`);
    const password = document.querySelector(`#${id} > #password`);
    const bio = document.querySelector(`#${id} > #bio`);

    const button = document.querySelector(`#${id} >  #edit`);

    const username_value = document.querySelector(`#${id} > #username`).textContent;
    const nickname_value = document.querySelector(`#${id} > #nickname`).textContent;
    const password_value = document.querySelector(`#${id} > #password`).textContent;
    const bio_value = document.querySelector(`#${id} > #bio`).textContent;

    username.innerHTML = `<input type="text" value="${username_value}">`;
    nickname.innerHTML = `<input type="text" value="${nickname_value}">`;
    password.innerHTML = `<input type="text" value="${password_value}">`;
    bio.innerHTML = `<input type="text" value="${bio_value}">`;

    button.innerHTML = `<button onclick="saveuser('${id}')">salvar</button>`;
}

async function get_all_users(){
    const response = await fetch('/adm_users',{method:'GET'});
    const data = await response.json();
    const table = document.querySelector('table');

    data.forEach(element => {
        const td = document.createElement('tr');
        td.id = element.username;
        td.innerHTML = `
            <td id="username">${element.username}</td>
            <td id="nickname">${element.nickname}</td>
            <td id="password">${element.passwrd}</td>
            <td id="bio">${element.bio}</td>
            <td id = "edit">
                <button onclick="deleteuser('${element.username}')">deletar</button>
                <button onclick="edituser('${element.username}')">editar</button>
            </td>`
        table.appendChild(td)
    });
}

get_all_users()