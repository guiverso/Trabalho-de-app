const express = require('express');//requer express
const path = require('path');//requer path
const app = express();//faz um server
const {} = require('../')
const port = 80;//numero da porta

app.use(express.static(path.join(__dirname,'../tests')));//permite que tenha acesso a tudo no public
const tests = path.join(__dirname,"../tests")
app.use(express.json());

app.get('/',(req,res) => {//pega alguma coisa (arquivo) do meu pc
  const testPage = path.join(__dirname,'../tests/index.html');//página de loguin
  res.sendFile(testPage);//manda a página de loguin
});

app.post('/',(req,res) => {
  var { valor, valor_inesperado } = req.body;

  if (valor){
    console.log(`aí sim, conseuimos, o nome é ${valor}`);
  }

  else{
    console.log("deu merda");
  }
})

app.listen(port, () => {//ouve o que tá na porta
  console.log(`servidor rodando na porta ${port}`);//indica a porta
});