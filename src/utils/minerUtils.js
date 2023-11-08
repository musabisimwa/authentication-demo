/**
 * 
 * @param {Miner} existingMiner : an existing miner
 * @param {Miner|{}} updatedParams : new miner or some miner parameters
 * @returns {Miner|null} return a new update or nothing
 */
exports.newMinerFromUpdates =(existingMiner,updatedParams)=>{

    if(!(existingMiner && updatedParams)){
        return null;
    }
    const existingMinerKeys =Object.keys(existingMiner);
    // verify that updated param keys are a subset of the exisiting keys
    if(!(Object.keys(updatedParams)
    .every(key=>existingMinerKeys.includes(key)))){
    return null;
}
//assign new params to the old obj 
return Object.assign(existingMiner,updatedParams);
}