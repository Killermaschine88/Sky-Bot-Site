const express = require('express');
const router = express.Router();

//Mongo
const collection = mclient.db('Sky-Bot').collection('commanduses');
const collection2 = mclient.db('Sky-Bot').collection('info');


router.get('/', async (req, res) => {

  let cmduse = await collection.find({}).sort({ uses: -1 }).toArray()
  const info = await collection2.findOne({ _id: 'info' })
  let total_used = 0

  for(const cmds of cmduse) {
    total_used += cmds.uses
  }

  let most_used = ''
  let i = 0

  for(const cmd of cmduse) {
    if(i < 5) {
      most_used += cmd._id + ', '
      i++
    } else {
      break
    }
  }

  res.send(`<b>BOT INFO</b><br>Uptime: ${info.uptime}<br>Guilds: ${info.guilds}<br>Channels: ${info.channels}<br><br><br><b>COMMAND INFO</b><br>Total used: ${total_used}<br>Most used: ${most_used}<br><br><br><b>NODE PROCESS</b><br>Memory usage: ${Math.round(info.mem_usage / 1024 / 1024 * 100) / 100} MB`)

})


module.exports = router