const db = require('../models/index')

const Miners =db.miners;


/**
 * get all miners
 * @returns {[]} Miner[] | []
 */
exports.getAllMiners=async()=>{
try {
    const miners = await Miners.findAll();
    if(miners){
        return miners;
    }
    return []
} catch (error) {
    // will be caught in the route file
    throw new Error(error);
}
}
/**
 * 
 * @param {number} id miner
 * @returns {} Miner obj|null
 * returns null id the object doesnt exist
 */
exports.getAMiner=async (id)=>{
    try {
        const miner = await Miners.findOne({
            where:{
                id:id
            }
        });
       return miner?miner:null;
        
    } catch (error) {
        throw new Error(error);
    }

}
/**
 * 
 * @param {} miner :Miner 
 * @param {number}userId  creator's id
 * create a new miner 
 */
exports.addMiner=(miner,userId)=>{

}
/**
 * 
 * @param {number} id miner id 
 * @returns Miner : updated miner
 * requires authenticated user
 * can update a miner's details only if you own it
 */
exports.updateMiner= async(id,userId)=>{
    try {
        
    } catch (error) {
        
    }
}

/**
 * 
 * @param {number} id 
 * requires authenticated user
 * can  destrroy a miner only if you own it
 */
exports.deleteMiner=async(id,userId)=>{
try {
    
} catch (error) {
    
}
}

module.exports =exports
