const {Sequelize,DataTypes} =require('sequelize');

//connect to db
const sequelize = new Sequelize(`
postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
{dialect:"postgres"});


//log if connected
sequelize.authenticate().then(
    ()=>{
        console.log("connected to db");
    }
).catch(err=>console.error(err));

//db obj

const db ={};
db.Sequelize =Sequelize;
db.sequelize=sequelize;


// models
db.users = require("./userModel")(sequelize,DataTypes);
db.miners= require("./minerModel")(sequelize,DataTypes);
// add more model connections here

// relationships
db.users.hasMany(db.miners,{as:"miners"});
//
// one miner belonds to one user .. 
db.miners.belongsTo(db.users,{foreignKey:"userId"});

//end.

module.exports =db;