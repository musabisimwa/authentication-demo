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
exports.addMiner=async (miner,userId)=>{
    try {
        const newMiner ={
            ...miner,
            userId:userId.id
        };

       

       const dbMiner= await Miners.create(newMiner);
       return dbMiner?dbMiner.id:null;
        
    } catch (error) {
        throw new Error(error);
    }

}
/**
 * 
 * @param {number} id miner id 
 * @param {number} userId :owner
 * @param {Miner} miner :new miner update
 * @returns Miner : updated miner
 * requires authenticated user
 * can update a miner's details only if you own it
 */
exports.updateMiner= async(id,userId,miner)=>{
    try {
      const updatedMiner = await Miners.update(miner,{
        where:{
            id,
            userId:userId.id
        }
      })  ;
      return updatedMiner;
        
    } catch (error) {
        throw new Error(error);
    }
}

/**
 * 
 * @param {number} id 
 * requires authenticated user
 * can  destrroy a miner only if you own it
 * @returns true if deleted otherwise throw err
 */
exports.deleteMiner=async(id,userId)=>{
try {
    await Miners.destroy({
        where:{
            id,
            userId:userId.id,
        }
    });
    return true;
} catch (error) {
    throw new Error(error);
    
}
}

/**
 * 
 * @returns All active miners
 */
exports.getActiveMiners=async()=>{
    try {
       const miners= await Miners.findAll({
            where:{
                active:true
            }
        });
        return miners;
    } catch (error) {
        throw new Error(error); 
    }
}

module.exports =exports
