const { Model } = require('sequelize');
const db = require('../services/db')
const crypto = require('crypto')
const profile = db.models.Profile;
const foruns = db.models.Foruns;

async function create_forum(req,res) {
    console.log("recebido")
    const {name, description, username} = req.body;

    const length = await (await foruns.findAll()).length
    const id = length+1;

    const forun = await foruns.create({id,name,description,owner:username})

    res.status(200).send('foiiiii')
}

async function get_created_foruns(req,res) {
    const { username } = req.body;

    const nickname = await profile.findOne({where:{username:username}})

    const allforuns = await foruns.findAll({where:{owner:username}, include:{model:profile, atributes:['nickname']}});
    
    const formatedforuns = allforuns.map(forum => ({
        name:forum.name,
        owner:forum.owner,
        id:forum.id,
        description:forum.description,
        owner_nickname:nickname.nickname,
    }))
    
    res.status(200).json(formatedforuns);
}

async function get_forum_by_id(req,res) {
    const {username} = req.body
    console.log(username)
    const forum = await foruns.findOne({where:{id:req.params.forum_id}});
    const nickname = await profile.findOne({where:{username:username}})
    const forumformated = {
        id:forum.id,
        name:forum.name,
        description:forum.description,
        owner:forum.owner,
        owner_nickname:nickname.nickname
    }
    res.json(forumformated);
}

async function get_all_foruns(req,res) {
    const allforuns = await foruns.findAll({raw:true});
    res.json(allforuns);
}
module.exports = {
    get_created_foruns, 
    create_forum, 
    get_forum_by_id,
    get_all_foruns
}