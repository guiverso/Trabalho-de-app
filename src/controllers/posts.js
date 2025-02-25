const db = require('../services/db')
const { Op } = require('sequelize');
const profile = db.models.Profile;
const foruns = db.models.Foruns;
const posts = db.models.Posts;

async function feed(req,res) {
    const allposts = await posts.findAll({
        where: {
            [Op.not]: { sender: null }
        },
        include:[
            {
                model: profile,attributes: ["nickname"]
            },
            {
                model:foruns,attributes:["name"]
            }
        ],logging:false, raw:true
    });
    if (allposts.length > 0){

        const formatedposts = allposts.map(post => ({
            title:post.title,
            sender:post.sender,
            forum_id:post.forum,
            forum_name:post['Forun.name'],
            sender_nickname:post['Profile.nickname'],
            content:post.content
        }))
        res.json(formatedposts);
    }
}

async function forum_feed(req,res){
    const {id} = req.body;
    console.log('foi')
    const allposts = await posts.findAll({
        where: {
            [Op.not]: { sender: null },
            forum:id
        },
        include:[
            {
                model: profile,attributes: ["nickname"]
            },
            {
                model:foruns,attributes:["name"]
            }
        ],logging:false, raw:true
    });
    if (allposts.length > 0){

        const formatedposts = allposts.map(post => ({
            title:post.title,
            sender:post.sender,
            forum_id:post.forum,
            forum_name:post['Forun.name'],
            sender_nickname:post['Profile.nickname'],
            content:post.content
        }))
        console.log(formatedposts);
        res.json(formatedposts);
    }
}

async function  create_post(req,res) {
    const {username,select,title,content} = req.body;
    console.log(username,select,title,content)
    const lenght = await posts.findAll({raw:true});
    console.log(lenght)
    const id = lenght.length+1;
    const post = await posts.create({id:id, sender:username,forum:select,title:title,content:content});
    res.send('pronto, post feito')
}

module.exports = {
    feed,
    create_post,
    forum_feed}