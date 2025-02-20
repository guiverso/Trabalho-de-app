const { Sequelize, Model, DataTypes, STRING, QueryInterface} = require('sequelize');
const crypto = require('crypto');

const db = new Sequelize({
  "database": "platinum",
  "username": "postgres",
  "password": "pabd",
  "host": "localhost",
  "port": 5432,
  "dialect": "postgres"
});
//perfis
async function verify(tablename){
  const queryinterface = db.getQueryInterface();
  const tables = await queryinterface.showAllTables();
  console.log(tables);
  try{
    if(tables.includes(tablename)){
      var columns = await queryinterface.describeTable(tablename);
      //console.log(columns);
      const modelo = await db.define(tablename,columns,{freezeTableName:true,timestamps:false})
      console.log('modelo criado com sucesso')
      return modelo;
    }else{
      console.log("tabela não encontrada");
      return null;
    }
  }catch{
    console.log("deu merda")
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
    return true;
  }
}

async function all_profiles() {
  const profile = await verify('Profile');
  const allprofiles = await profile.findAll({raw:true});
  console.log(allprofiles);
  return allprofiles;
}

async function find_profile_by_email(email) {
  const profile = await verify('Profile');
  const user =  await profile.findByPk(email);
  console.log('usuário encontrado com sucesso');
  console.log(user)
  return user;
}

async function delete_profile(email) {
  const profile = await verify('Profile');
  const user =  await profile.findByPk(email);
  console.log('usuario',user);
  if(user === null){
    console.log("usuário não encontrado");
  }else{
    const result = await user.destroy()
    console.log("usuário deletado");
  }
}

async function update_profile(email,newnickname = '',newpassword = ''){
  const profile = await verify('Profile');
  const user =  await profile.findByPk(email);

  if(user == null){
    console.log("usuário não encontrado")
  }else{
    console.log("usuário encontrado")
    if(newnickname != ''){
      user.set({nickname:newnickname})
      console.log('nickname atualizado');
    }if(newpassword != ''){
      user.set({passwrd:newpassword})
      console.log('password atualizado');
    }
    user.save()
  }
}

//foruns
async function create_forum(name, email, description){
  const foruns = await verify('Foruns');
  var id = crypto.randomBytes(6).toString('hex');
  const verif = await foruns.findByPk(id);
  if(verif == null){
    const forum = await foruns.create({
      forum_id: id,
      forum_name:name,
      owner_email:email,
      forum_description:description,
    });
  }else{
    id = crypto.randomBytes(12).toString('hex');
    const verif = await foruns.findByPk(id);
  }
}

async function all_foruns(){
  const foruns = await verify('Foruns');
  const allforuns = await foruns.findAll({raw:true});
  console.log(allforuns);
  return allforuns;
}

async function select_forum_by_pk(id){
  const foruns = await verify('Foruns');
  const forun =  await foruns.findByPk(id);
  console.log('forum encontrado com sucesso');
  console.log(forun)
  return forun;
}
/*db.define('Foruns',{
  forum_id:{type:DataTypes.STRING(12), primaryKey:true},
  forum_name:{type:DataTypes.STRING(40)},
  owner_email:{type:DataTypes.STRING(40),references:{model:'Profile', key:'email'}},
  forum_description:{type:DataTypes.STRING(280)}
},{
  freezeTableName:true,
})

db.sync()*/

module.exports = {
  //perfis
  verify : verify,
  insert_profile:insert_profile,
  all_profiles:all_profiles,
  delete_profile:delete_profile,
  find_profile_by_email:find_profile_by_email,
  update_profile:update_profile,
  //foruns
}