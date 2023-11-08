// could have been better/cleaner DRY
exports.userSignUpValidator =(reqObj)=>{
    // verify if user creds are valid types
    if(reqObj){
        const {userName,email,password}=reqObj;
        if(!email){return false;}
        if(typeof(userName) ==="string" && 
        (typeof(email)==="string"&& email.includes('@'))
        && typeof(password)==='string'
        )
        return true;
    }
    return false;
}
exports.userValidator=(reqObj)=>{
    if(reqObj){
        const {email,userName}=reqObj;
        if(email){
            return email.includes('@') && typeof(userName)==='string'
        }
        return false;
        
    }
    return false;
}

exports.userLoginValidator=(reqObj)=>{
    if(reqObj){
        const {email,password}=reqObj;
        if(!email){return false;}

        return email.includes('@') && typeof(password)==='string'
    }
    return false;
}

module.exports =exports;
