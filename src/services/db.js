const { Sequelize, Model, DataTypes, STRING, QueryInterface} = require('sequelize');

const db = new Sequelize({
  "database": "platinum",
  "username": "postgres",
  "password": "pabd",
  "host": "localhost",
  "port": 5432,
  "dialect": "postgres"
});

async function verify(tablename){
  try{
    const queryinterface = db.getQueryInterface();
    const tables = await queryinterface.showAllTables();

    if(tables.includes(tablename)){
      console.log(tables);

      const modelo = db.define(tablename,{
        email: {type: 'CHARACTER VARYING(40)',primaryKey: true},
      passwrd: {type: 'CHARACTER VARYING(20)'},
      nickname: {type: 'CHARACTER VARYING(40)'}
    },{freezeTableName:true, timestamps:false});

      console.log(` Model "${tablename}" encontrado com sucesso!`);
      db.sync()
      return modelo;
    }      
  }catch (error){
    console.log("erro ao verificar a tabela", error);
    return null;
  }
}

async function insert_profile(email, password, nickname){
  const profile = await verify('Profile');
  const queryinterface = db.getQueryInterface();

  //console.log(await queryinterface.describeTable('Profile'));
  var verif = await profile.findByPk(email);
  if(verif != null){
    console.log("usuário já existe");
  }else{
    var user = profile.create({
      email: email,
      passwrd: password,
      nickname: nickname
    })
    console.log("usuário criado")
  }
}

async function all_profiles() {
  const profile = await verify('Profile');
  const allprofiles = await profile.findAll({raw:true});
  console.log(allprofiles);
  return allprofiles;
}

module.exports = {
  verify : verify,
  insert_profile:insert_profile,
  all_profiles:all_profiles
}