import fs from "fs";
import WAWebJS, { Client, MessageMedia } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';

import onMessage from './onMessage';

const SESSION_FILE_PATH = '../session.json';
let sessionData;
import('../session.json').then(data => {
	sessionData = data;
	console.log('found: data:', data);
})

// Use the saved values
const client: WAWebJS.Client = new Client({
	session: {
		WABrowserId: '"qTggryfZdiGVZT3avEPAmA=="',
		WASecretBundle: '{"key":"ByHCWCHmp7RWVz5Eue0cx7hm7La+8HT9dZSgjrmnD48=","encKey":"dwhF3pjsw2L1nG7v77r0pkfd/eGCW1ueUV+W2BwpXsc=","macKey":"ByHCWCHmp7RWVz5Eue0cx7hm7La+8HT9dZSgjrmnD48="}',
		WAToken1: '"SxshOF9BzlVXJfBYVnEDFhKpBEbHevEt1woCJl8AXtg="',
		WAToken2: '"1@7101/gzUUmdyVdrWg9Jf669qceTdJVGSMn4xo/oZgoiioSVFI+qTbeRSs3cfMKJ4LlxKQnhXa99cIg=="'
	  },
	puppeteer: '/usr/bin/google-chrome-stable'
});

client.on('authenticated', (session) => {
	console.log(session)
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


client.on('message', onMessage);

client.on('group_join', async gn => {
	// gn.id.remote
	const groupNotificationId: object = gn.id;
	const groupChatId: {remote: string} = {...{remote:''}, ...groupNotificationId};
	const chat: WAWebJS.Chat = await client.getChatById(groupChatId.remote);
	console.log(chat)
	const stickerBienvenido: MessageMedia = MessageMedia.fromFilePath('./public/bienvenido.webp')
	chat.sendMessage(stickerBienvenido, {
		sendMediaAsSticker: true
	})
})

client.initialize();
