const { Client } = require('pg');

function create_tables(client){
  try{
    client.connect()
    const command = pool.query("CREATE TABLE Profile(nickname VARCHAR(20), username VARCHAR(20), Passwrd VARCHAR(20), CONSTRAINT username_pk PRIMARY KEY (username))");
    console.log("tabelas criadas")
    client.end()

  }catch (err){
    console.log("erro")
  }

};

try{
  var client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: '20221214010003',
    password: 'pabd',
    port: 5432,
  });

  client.connect();
  console.log("database existe");
}catch{
  console.log('database não existe');
}