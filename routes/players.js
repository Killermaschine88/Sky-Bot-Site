const express = require('express');
const router = express.Router();

//Mongo Collection
const collection = mclient.db('SkyblockSim').collection('Players');

router.get('/:id', async (req, res) => {
  const { id } = req.params
  
  let player = await collection.findOne({ _id: id });

  const success = {
    status: {
      code: 200,
      message: 'OK'
    }, profile: {
      player
    }
  }
  const failure = {
    status: {
      code: 400,
      message: 'No Profile found for ID'
    }
  }
  
  if(player) {
    res.send(success)
  } else {
    res.send(failure)
  }
})

module.exports = router