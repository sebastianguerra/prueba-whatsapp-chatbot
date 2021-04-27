import fs from "fs";
import { Client } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';

const client: Client = new Client({});

client.on('qr', (qr) => {
	// Generate and scan this code with your phone
	qrcode.generate(qr, {small:true});
});

const SESSION_FILE_PATH = __dirname+'/public/session.json';
client.on('authenticated', (session) => {
	console.log(session);
    if(!fs.existsSync(SESSION_FILE_PATH))
        fs.appendFileSync(SESSION_FILE_PATH,  JSON.stringify(session));
    else
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
    process.exit();
});

client.initialize();