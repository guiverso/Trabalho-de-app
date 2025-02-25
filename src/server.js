const express = require('express');//requer express
const path = require('path');//requer path
const database = require('./services/db');
const { login, create } = require('./controllers/auth');
const {feed,create_post,forum_feed} = require('./controllers/posts')
const { get_created_foruns, create_forum, get_forum_by_id, get_all_foruns} = require('./controllers/foruns')
const app = express();//faz um server
const port = 80;//numero da porta

app.use(express.json());

const public = path.join(__dirname,"../public");
app.use(express.static(path.join(public)));//permite que tenha acesso a tudo no public

//gets
app.get('/',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  const loginPage = path.join(__dirname,'../public/login/index.html');//página de loguin
  res.sendFile(loginPage);//manda a página de login
});

app.get('/create_profile',(req,res) => {
  const create_profile = path.join(__dirname,'../public/create_profile/index.html');
  res.sendFile(create_profile);
});

app.get('/home',(req,res) => {
  console.log('/home requisitado')
  const homepage = path.join(__dirname,'../public/home/index.html');
  res.sendFile(homepage);
});

app.get('/my_foruns/:username',(req,res) => {
  const myforunspage = path.join(__dirname,'../public/myforuns/index.html');
  res.sendFile(myforunspage);
});

app.get('/createforum',(req,res)=>{
  const createforumpage = path.join(__dirname,'../public/createforum/index.html');
  res.sendFile(createforumpage)
});

app.get('/create_post',(req,res)=>{
  const postpage = path.join(__dirname,'../public/create_post/index.html');
  res.sendFile(postpage)
});

app.get('/forum/:forum_id',(req,res)=>{
  const forumpage = path.join(__dirname,'../public/forum/index.html')
  res.sendFile(forumpage);
});

app.get('/feed',feed);

//posts
app.post('/forum/:forum_id',get_forum_by_id);

app.post('/get_all_foruns',get_all_foruns);

app.post('/forum_feed',forum_feed);

app.post('/login',login);

app.post('/create_profile',create);

app.post('/created_foruns',get_created_foruns);

app.post('/create_forum_post', create_forum);

app.post('/public_post',create_post);

app.listen(port, () => {//ouve o que tá na porta
  console.log(`servidor rodando na porta ${port}`);//indica a porta
});