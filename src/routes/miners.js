const {
  updateMiner,
  getAMiner,
  getAllMiners,
  deleteMiner,
  getActiveMiners,
  addMiner,
} = require("../services/minerService");
const { newMinerFromUpdates } = require("../utils/minerUtils");
const { minerValidator } = require("../utils/validators");

/**
 *  GET /
 * @param {*} req
 * @param {*} res
 */
const getAll = (req, res) => {
  getAllMiners()
    .then((miners) => {
      if (Array.isArray(miners)) {
        return res.status(200).json(miners);
      }
      // return an empty array if no miners
      return res.status(200).json([]);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ msg: "internal server error" });
    });
};

const getActive = (req, res) => {
  getActiveMiners()
    .then((miners) => {
      if (Array.isArray(miners)) {
        return res.status(200).json(miners);
      }
      // return an empty array if no miners
      return res.status(200).json([]);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ msg: "internal server error" });
    });
};

/**
 *  GET /:id
 * @param {*} req
 * @param {*} res
 */
const getOne = (req, res) => {
  const id =parseInt( req.params.id);

  if (!isNaN(id)) {
    getAMiner(id)
      .then((miner) => {
        //if miner exists
        if (miner) {
          return res.status(200).json(miner);
        }
        return res.status(404).json({ msg: "not found" });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
      });
  }else{

      return res.status(404).json({ msg: "not found" });
  }
};

/**
 * PUT /:id
 * @param {*} req
 * @param {*} res
 */

const update = async (req, res) => {
    const user = req.user;
    const paramId = parseInt(req.params.id);
    const updatedMiner = req.body;
  
    // Check if user and paramId are defined
    if (!(user && paramId)) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  
    // Check if updatedMiner is valid
    if (!updatedMiner) {
      return res.status(400).json({ msg: "Bad request: empty body" });
    }
  
    try {
      // Get the existing miner
      let existingMiner = await getAMiner(paramId);
        existingMiner = existingMiner.dataValues;
        console.log(existingMiner)
      // Check if the miner exists and belongs to the user
      if (existingMiner && existingMiner.userId === user.id) {
        const newMiner = newMinerFromUpdates(existingMiner, updatedMiner);
        console.log(newMiner)
        if (newMiner) {
          // Update the miner
          const updatedMiner = await updateMiner(paramId, user, newMiner);
  
          if (updatedMiner) {
            
            return res.status(200).json({updateMiner});
          } else {
            return res.status(500).json({ msg: "Internal server error" });
          }
        } else {
          return res.status(400).json({ msg: "Bad request: invalid miner data" });
        }
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };
  
  


const deleteAMiner = (req, res) => {
  const user = req.user;
  const paramId = req.params.id;

  if (!(user && paramId)) {
    return res.status(401).json({ msg: "unathorized" });
  }
  //delete miner service
  deleteMiner(paramId)
    .then((action) => {
      if (action) {
        return res.status(204).json({id:paramId});
      }
    })
    .catch((error) => {
      //failed to delete
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    });
};

const post = (req, res) => {
  const miner = req.body;
  const user = req.user;

  if (!(user && miner)) {
    return res.status(401).json({ msg: "unathorized" });
  }

  //validate miner
  if (!minerValidator(miner)) {
    //not valid body
    return res.status(400).json({ msg: "bad request " });
  }

  addMiner(miner, user)
    .then((minerObj) => {
      if (minerObj) {
        return res.status(201).json({ minerObj});
      } else {
        return res.status(401).json({ msg: "unathorized" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    });
};

module.exports = { getAll, update, getOne, deleteAMiner, post,getActive };
