// the minerModel schema

module.exports=(sequelize,DataTypes) =>{
    // table name = miner
    const Miner = sequelize.define("miner",{
        
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        //more table attributes here

    },{timestamps:true});
    return Miner;
}