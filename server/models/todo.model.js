module.exports=(sequelize,Sequelize)=>{
    const Todos=sequelize.define("todo",{
        title:{type:Sequelize.DataTypes.STRING(15),allownull:false},
        complete:{type:Sequelize.DataTypes.BOOLEAN,allownull:false,default:false},
        category:{type:Sequelize.DataTypes.STRING,allownull:false},
        addedby:{
           type:Sequelize.STRING(15),
           allowNull:false,
           Reference:{
               model:"users",
               key:"username"
           }
        }
    })
    return Todos;
}