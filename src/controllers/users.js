const db = require('../services/db')
const profile = db.models.Profile;

async function edit_user(req,res) {
    const {username,nickname,password,bio,id} = req.body;
    console.log({username,nickname,password,bio,id})
    await profile.update({username,nickname,password,bio},{where:{username:id}});
    const newprofile = await profile.findOne({where:{username},raw:true})
    console.log(newprofile)
    res.json(newprofile)
}

async function get_all_profiles(req,res) {
    const allprofiles = await profile.findAll({raw:true, logging:false})
    res.json(allprofiles)
}

async function delete_user(req,res) {
    const {id} = req.body
    const profile_selected = await profile.findOne({where:{username:id},logging:false})
    await profile_selected.destroy({logging:false})
    res.status(200).send()
}

module.exports = {get_all_profiles,delete_user,edit_user}