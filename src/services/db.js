const { Sequelize, Model, DataTypes, STRING, QueryInterface} = require('sequelize');

const db = new Sequelize({
  "database": "platinum",
  "username": "postgres",
  "password": "pabd",
  "host": "localhost",
  "port": 5432,
  "dialect": "postgres"
});
async function show_all_tables() {
  const query = await db.getQueryInterface();

  const alltables = await query.showAllTables()

  console.log(alltables)
}

const Profile = db.define('Profile',{
  nickname : {type:DataTypes.STRING(40)},
  username : {type:DataTypes.STRING(20),primaryKey:true},
  passwrd : {type: DataTypes.STRING(20)},
  bio : {type: DataTypes.STRING(280)}
},{freezeTableName:true,timestamps:false})
const Foruns = db.define('Foruns',{
  name: {type:DataTypes.STRING(40)},
  description: {type:DataTypes.STRING(280)},
  owner: {type:DataTypes.STRING(20),references:{model:'Profile', key:'username'}}
},{freezeTableName:true,timestamps:false,})
const Posts = db.define('Posts',{
  title:{type:DataTypes.STRING(40)},
  content:{type:DataTypes.STRING(280)},
  sender:{type:DataTypes.STRING(20), references:{model:'Profile', key:'username'}},
  forum:{type:DataTypes.INTEGER, references:{model:'Foruns', key:'id'}}
},{freezeTableName:true,timestamps:false})

const Follow = db.define('Follow',{
  user:{type:DataTypes.STRING(20), references:{model:'Profile', key:'username'}},
  forum:{type:DataTypes.INTEGER, references:{model:'Foruns', key:'id'}}
},{freezeTableName:true,timestamps:false})

Foruns.belongsTo(Profile,
  { foreignKey:'owner',targetKey:'username',onDelete:'CASCADE',onUpdate:'CASCADE'},{logging:false})

Posts.belongsTo(Profile,{foreignKey:'sender', targetKey:'username',onDelete:'CASCADE',onUpdate:'CASCADE'},{logging:false})
Posts.belongsTo(Foruns,{foreignKey:'forum',targetKey:'id',onDelete:'CASCADE',onUpdate:'CASCADE'},{logging:false})

Follow.belongsTo(Profile,{foreignKey:'sender', targetKey:'username',onDelete:'CASCADE',onUpdate:'CASCADE'},{logging:false})
Follow.belongsTo(Foruns,{foreignKey:'forum',targetKey:'id',onDelete:'CASCADE',onUpdate:'CASCADE'},{logging:false})

db.sync({logging:false}) 

module.exports = db;