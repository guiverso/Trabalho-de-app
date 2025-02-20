const express = require('express');//requer express
const path = require('path');//requer path
var {insert_profile,verify,find_profile_by_email} = require('./services/db')
const app = express();//faz um server
const port = 80;//numero da porta

app.use(express.json());

const public = path.join(__dirname,"../public");
app.use(express.static(path.join(public)));//permite que tenha acesso a tudo no public

app.get('/',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  const loginPage = path.join(__dirname,'../public/login/index.html');//página de loguin
  res.sendFile(loginPage);//manda a página de login
});

app.get('/create_profile',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  const create_profile = path.join(__dirname,'../public/create_profile/index.html');//página de login
  res.sendFile(create_profile);//manda a página de login
});

app.post('/',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  const {email, password} = req.body;
  const result = find_profile_by_email(email);
  if(password == result.password){
    res.sendFile()
  }
});

app.post('/create_profile',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  var {nickname, email, password} = req.body;
  var result = insert_profile(email,password,nickname);
  console.log(`um boçal de email ${email} e nickname ${nickname} tentou criar uma senha com ${password}`)
})

app.listen(port, () => {//ouve o que tá na porta
  console.log(`servidor rodando na porta ${port}`);//indica a porta
});