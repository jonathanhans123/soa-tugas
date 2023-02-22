const Sequelize = require("sequelize");
const sequelize = require("../databases/connection");
const { DataTypes, Op } = Sequelize;
const { Message } = require("../models/message")(sequelize,DataTypes);
const { User } = require("../models/user")(sequelize,DataTypes);

const sendMessage = async (req,res) => {
    let { username, password, message, usercari } = req.body;

    const user = await sequelize.models.User.findOne(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    
    const friend = await sequelize.models.User.findOne(
        {where: {
            username: {
                [Op.eq]: usercari
            }
        }},
    );

    await sequelize.models.Message.create(
        {
            id_user_pengirim:user.id,
            pesan:message,
            id_user_dikirim:friend.id
        }
    ).then((result) => {
        res.status(201).json({msg:"Berhasil send chat",result});
    }).catch((err) => {
        res.status(400).json({msg:"Silahkan coba lagi",err})
    });
    return res.status(200).json({msg:"ahlo"})

}
const viewMessage = async(req,res) => {
    let {username} = req.params;
    let {password} = req.body;

    const user = await sequelize.models.User.findOne(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );

    const message = await sequelize.models.Message.findAll(
        {where: {id_user_pengirim:{
            [Op.eq]:user.id
        }}}
    );
    if (message.length>0){
        return res.status(200).json({message});
    }else{
        return res.status(500).json({msg: `Tidak ada chat`})
    }

}

module.exports = {
    sendMessage,
    viewMessage,
}