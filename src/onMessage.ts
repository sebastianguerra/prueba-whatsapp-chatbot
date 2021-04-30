import WAWebJS, {Client} from 'whatsapp-web.js';

import fight from './funciones/cmdFight';
import kill from './funciones/cmdKill';
import sticker from './funciones/cmdSticker'
import eval from './funciones/cmdEval';
import help from './funciones/cmdHelp';


const comandos: {[id: string]:  (msg:WAWebJS.Message)=>void} = {
	"!help" : help,
	"!eval": eval,
	"!sticker": sticker,
	"/kill": kill,
	"!kill": kill,
	"/fight": fight,
	"!dueloamuerteconcuchillos": fight,
	"!fight": fight
};


export default (client: Client) => {
	return async (msg: WAWebJS.Message) => {
		const texto: string = msg.body.toLowerCase();
	
		// Usa msg
		if(texto == 'a') {
			msg.reply('a')
		}

		// Usa msg
		let matchesPing:RegExpMatchArray|null = texto.match(/!ping/g);
		let matchesPong:RegExpMatchArray|null = texto.match(/!pong/g);
		if(matchesPing && matchesPong) {
			msg.reply(texto
				.replace(/!ping/g, "ahjiuregr8734hkljbval298hahlhg")
				.replace(/!pong/g, "ping")
				.replace(/ahjiuregr8734hkljbval298hahlhg/g, "pong")
			)
		} else{
			if(matchesPing){
				let cantidad: number = matchesPing.length
				if(cantidad > 1){
					let res: string = ''
					for(let i: number = 0; i <= cantidad; i++) {
						res += 'pong '
					}
					msg.reply(res+'gane;)');
				} else {
					msg.reply('pong');
				}
			}
			if(matchesPong){
				let cantidad: number = matchesPong.length;
				if(cantidad > 1){
					let res: string = '';
					for(let i = 0; i <= cantidad; i++) {
						res += 'ping ';
					}
					msg.reply(res+'gane;)')
				} else {
					msg.reply('ping')
				}
			}
		}

		// Usa msg y client
		if(msg.links.length > 0){
			if(texto.includes('https://chat.whatsapp.com/')){
				let inviteCode = msg.links[0]; 
				try {
					inviteCode = inviteCode.replace('https://chat.whatsapp.com/', '');
					await client.acceptInvite(inviteCode); 
					msg.reply('Entre al grupo!:D'); 
				} catch (e) { 
					msg.reply('That invite code seems to be invalid.'); 
				}
			}
		}
		
		if(texto[0] == '!' || texto[0] == '/') {
			let comando: string = texto.split(' ')[0];
			try{
				comandos[comando](msg);
			} catch {
				console.log("Comando desconocido: ", comando);
			}
		}
	
		const user: WAWebJS.Contact = await msg.getContact();
		const chat: WAWebJS.Chat = await msg.getChat();
		console.log(chat.name, ": ", user.name || user.pushname, ": ", msg.body);
		chat.sendSeen();
	}
}
