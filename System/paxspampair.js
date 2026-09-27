const pino = require("pino")
const { makeWASocket, fetchLatestBaileysVersion, initAuthCreds } = require("@whiskeysockets/baileys")

async function startPairing(number, replyTo, mainSock, total = 1, delay = 5) {

number = number.replace(/[^0-9]/g, "")

const { version } = await fetchLatestBaileysVersion()

const authState = {
    creds: initAuthCreds(),
    keys: {
        get: async () => ({}),
        set: async () => {}
    }
}

const userSock = makeWASocket({
    auth: authState,
    version,
    logger: pino({ level: "silent" }),
    browser: ["Ubuntu", "Chrome", "20.0.04"]
})

userSock.ev.on("connection.update", async (update) => {

const { connection, lastDisconnect } = update

if(connection === "close"){

console.log("Socket Closed")

setTimeout(()=>{
startPairing(number, replyTo, mainSock, total, delay)
},3000)

}

})

let sent = 0

async function sendPair() {

if (sent >= total) {
clearInterval(loop)
return
}

try {

const code = await userSock.requestPairingCode(number)
const formatted = code.match(/.{1,4}/g).join("-")

sent++

await mainSock.sendMessage(replyTo,{
text:`🔐 PAIR ${sent}/${total}\n\n${formatted}`
})

} catch(e) {
console.log("PAIR ERROR:", e.message)
}

}

const loop = setInterval(sendPair, delay * 1000)

setTimeout(() => {
sendPair()
}, 4000)

}

module.exports = { startPairing }