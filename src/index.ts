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

const puppeteerRoute: string = (process.platform == 'linux')? '/usr/bin/google-chrome-stable': (process.platform == 'darwin')? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
console.log(puppeteerRoute);
// Use the saved values
const client: WAWebJS.Client = new Client({
	session: sessionData,
	puppeteer: { 'headless': "headless", executablePath: puppeteerRoute}
});



client.on('ready', async () => {
	console.log('Client is ready!');
	let wwebversion = await client.getWWebVersion();
	console.log("Whatsapp Web Veresion: ", wwebversion);
});


client.on('message', onMessage(client));

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
