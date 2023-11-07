// the userModel schema

module.exports=(sequelize,DataTypes) =>{
    // table name = user
    const User = sequelize.define("user",{
        userName:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            isEmail:true //check if is email format
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:true});
    return User;
}