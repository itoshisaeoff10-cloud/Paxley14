// —#copyright by AlzSync Developer 
const fs = require('fs')
// Module
global.tokens = ["abaikan sajah ini ga guna"]
// Token React Ch
global.connect = true
// true = pair code : false = qr code
global.publicX = true 
// true = semua bisa pake : false = hanya owner
global.owner = ['6285840351569'] 
// ubah ke nomer mu untuk akses fitur owner
global.prefa = ["/","","!",".",",","#"]
//System Bot Settings
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})