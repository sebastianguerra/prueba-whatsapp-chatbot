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
	session: sessionData,
	puppeteer: {
		executablePath:'/usr/bin/google-chrome-stable'
	}
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
	if(msg.body === "!ping") {
		msg.reply('pong')
	}else if(msg.body.includes("!ping")){
		msg.reply('pong')
	}
	let user = await msg.getContact();
	console.log(user.name || user.pushname, ": ", msg.body);
});

client.initialize();
