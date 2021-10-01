const Sequelize=require('sequelize');
require('dotenv').config();
const {DB,DB_USER,DB_PASSWORD,DB_DIALECT,DB_HOST}=process.env
const sequelize=new Sequelize(DB,DB_USER,DB_PASSWORD,{
    dialect:DB_DIALECT,
    host:DB_HOST,
    logging:false
});

(async()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection to db Successfully");
        await sequelize.sync({alter:true})
        console.log("SYNC COMPLETE");
    } catch (error) {
        console.log(error.message);
    }
})

const db={};
db.sequelize=sequelize;
db.Sequelize=Sequelize;
db.User=require('./user.model')(sequelize,Sequelize);
db.Todos=require('./todo.model')(sequelize,Sequelize);

module.exports =db;