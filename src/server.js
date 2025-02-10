const express = require('express');//requer express
const path = require('path');//requer path
const app = express();//faz um server
const port = 80;//numero da porta

app.use(express.static(path.join(__dirname,'../public')));//permite que tenha acesso a tudo no public
const public = path.join(__dirname,"../public")

app.get('/',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  const loginPage = path.join(__dirname,'../public/login/index.html');//página de loguin
  res.sendFile(loginPage);//manda a página de loguin
});

app.listen(port, () => {//ouve o que tá na porta
  console.log(`servidor rodando na porta ${port}`);//indica a porta
});