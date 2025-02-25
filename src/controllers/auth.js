const db = require('../services/db');
const profiles = db.models.Profile;

async function create(req, res){
    var { nickname, username, passwrd, bio } = req.body;

    const profile = await profiles.findOne({ where: { username: username }, raw: true, logging: false });

    if(profile == null){
        await profiles.create({ username, passwrd, nickname, bio });
        res.json({message:"volte para o login"});
    }else{
        res.status(400).send({ message: 'Usuário já existe' });
    }
}

async function login(req,res){
    const {username, passwrd} = req.body;

    const profile = await profiles.findOne({ where: { username: username }, raw: true, logging: false });
    console.log(profile);

    if(profile != null){
        if(profile.passwrd == passwrd){
            res.status(200).send({message:"bem sucedido"});
        }else{
            res.status(404).json({message:"senha incorreta"});
        }
    }else{
        res.status(404).json({message: "Usuário não encontrado"});
    }
}

module.exports = { create, login };