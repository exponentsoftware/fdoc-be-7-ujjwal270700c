module.exports=(sequelize,Sequelize)=>{
    const User=sequelize.define("user",{
        username:{type:Sequelize.DataTypes.STRING(15),allownull:false,unique:true},
        email:{type:Sequelize.DataTypes.STRING,allownull:false,unique:true},
        password:{type:Sequelize.DataTypes.STRING,allownull:false},
        role:{type:Sequelize.DataTypes.STRING,allownull:false,default:"user"},
    })
    return User;
}