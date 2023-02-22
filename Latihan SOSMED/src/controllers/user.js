const {Sequelize} = require("sequelize");
const sequelize = require("../databases/connection");
const { DataTypes, QueryTypes, Op } = Sequelize;


const getAll = async (req,res) => {
    console.log(sequelize.models)
    const result = await sequelize.models.User.findAll();
    return res.json(result);
}

const register = async (req,res) => {
    let { username, password, nama, alamat, nomorhp } = req.body;
    const result = await sequelize.models.User.findAll(
        {where: {
            username: {
                [Op.eq]: username
            }
        }},
    )
    const insert = undefined;
    console.log(result.length);
    if (result.length==0){
        await sequelize.models.User.create(
            {username: username,
            password: password,
            nama: nama,
            alamat: alamat,
            nomorhp: nomorhp},
        ).then((result) => {
            console.log(result);
            return res.status(200).json({msg: `Success insert dengan id ${result.id}`,result});
        }).catch((err) => {
            console.error(err);
            return res.status(500).json({msg: `Silahkan coba lagi`,err});
        });
        
    }else {
        return res.status(400).json({msg: `Username sudah ada`});
    }
    if (insert){
    }else{
    }
}
const login = async(req,res) => {
    let { username,password } = req.body;
    const result = await sequelize.models.User.findAll(
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    if (result.length!=0){
        return res.status(200).json({msg:"User Ditemukan"})
    }else{
        return res.status(400).json({msg:"User Tidak Ditemukan"})
    }

}
const editProfile = async (req,res) => {
    let {nama,alamat,nomorhp,username,password} = req.body;
    const result = await sequelize.models.User.update(
        {
            nama:nama,
            alamat:alamat,
            nomorhp:nomorhp,
        },
        {where: {username:{
            [Op.eq]:username
        },password:{
            [Op.eq]:password
        }}}
    );
    if (result){
        return res.status(200).json({msg: `Success update`});
    }else{
        return res.status(500).json({msg: `Silahkan coba lagi`})
    }

}

module.exports = {
    getAll,
    register,
    login,
    editProfile,
}