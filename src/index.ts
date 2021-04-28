import fs from "fs";
import WAWebJS, { Client, MessageMedia } from "whatsapp-web.js";
import path from "path";

import onMessage from './onMessage';

const SESSION_FILE_PATH = path.resolve('dist', 'public', 'session.json');
console.log(SESSION_FILE_PATH)
let sessionData: WAWebJS.ClientSession;
if(fs.existsSync(SESSION_FILE_PATH)){
	sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH).toString());
}else{
	console.log("Debes crear la sesion primero!\nEjecuta 'npm run getSession'");
	process.exit();
}

// Use the saved values
const client: WAWebJS.Client = new Client({
	session: sessionData,
	puppeteer: '/usr/bin/google-chrome-stable'
});



client.on('ready', () => {
	console.log('Client is ready!');
});


client.on('message', onMessage);

client.on('group_join', async gn => {
	const groupNotificationId: object = gn.id;
	const groupChatId: {remote: string} = {...{remote:''}, ...groupNotificationId};
	const chat: WAWebJS.Chat = await client.getChatById(groupChatId.remote);
	console.log(chat)
	const stickerBienvenido: MessageMedia = MessageMedia.fromFilePath(path.resolve('media', 'bienvenido.webp'));
	chat.sendMessage(stickerBienvenido, {
		sendMediaAsSticker: true
	})
});

client.on('group_leave', async gn => {
	const groupNotificationId: object = gn.id;
	const groupChatId: {remote: string} = {...{remote:''}, ...groupNotificationId};
	const chat: WAWebJS.Chat = await client.getChatById(groupChatId.remote);
	console.log(chat)
	const stickerChao: MessageMedia = MessageMedia.fromFilePath(path.resolve('media', 'chao.webp'));
	chat.sendMessage(stickerChao, {
		sendMediaAsSticker: true
	})
});

client.initialize();
