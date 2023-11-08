// the minerModel schema

module.exports=(sequelize,DataTypes) =>{
    // table name = miner
    const Miner = sequelize.define("miner",{
        
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        hashRate:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        //more table attributes here

    },{timestamps:true});
    return Miner;
}