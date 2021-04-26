const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
	sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
	session: sessionData
});

client.on('authenticated', (session) => {
	sessionData = session;
	fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
		if(err) {console.error(err);}
	})
});

client.on('qr', (qr) => {
	// Generate and scan this code with your phone
	qrcode.generate(qr, {small:true});
});

client.on('ready', () => {
	console.log('Client is ready!');
});

client.on('message', async (msg) => {
	const user = await msg.getContact()
	console.log(user)
	console.log(user.id)
	console.log(user.id.user)
	const texto = msg.body.toLowerCase()
	if(texto.includes('linux') ) {
		msg.reply("I use Arch btw")
	}

	let matchesPing = texto.match(/!ping/g)
	let matchesPong = texto.match(/!pong/g)
	if(matchesPing )
	if(matchesPing){
		cantidad = matchesPing.length
		if(cantidad > 1){
			let res = ''
			for(let i = 0; i <= cantidad; i++) {
				res += 'pong '
			}
			msg.reply(res+'gane;)')
		} else {
			msg.reply('pong')
		}
	}
	
	if(matchesPong){
		cantidad = matchesPong.length
		if(cantidad > 1){
			let res = ''
			for(let i = 0; i <= cantidad; i++) {
				res += 'ping '
			}
			msg.reply(res+'gane;)')
		} else {
			msg.reply('ping')
		}
	}


	if(texto.includes('!kill') || texto.includes('/kill')) {
		const deathMessages = [
			"was pricked to death", 
			"drowned",
			"experienced kinetic energy",
			"blew up",
			"hit the ground too hard",
			"fell from a high place",
			"fell off a ladder",
			"fell off some vines",
			"fell off some weeping vines",
			"fell off scaffolding",
			"fell while climbing",
			"was squashed b a falling anvil",
			"was squashed by a falling block",
			"went up in flames",
			"burned to death",
			"tried to swim in lava",
			"was struck by lightning",
			"discovered the floor was lava",
			"was killed by magic",
		]

		chat = await msg.getChat()
		chat.sendMessage(`@${user.id.user} ${deathMessages[parseInt(Math.random()*deathMessages.length)]}`, {
			mentions: [user]
		})
	}

	console.log(user.name || user.pushname, ": ", msg.body);
});

client.initialize();
