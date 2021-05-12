import WAWebJS, {Client} from 'whatsapp-web.js';

import fight from './funciones/cmdFight';
import kill from './funciones/cmdKill';
import sticker from './funciones/cmdSticker'
import eval from './funciones/cmdEval';
import help from './funciones/cmdHelp';
import test from './funciones/test';


const comandos: {[id: string]:  (msg:WAWebJS.Message, id: number)=>void} = {
	"!help" : help,
	"!eval": eval,
	"!sticker": sticker,
	"/kill": kill,
	"!kill": kill,
	"/fight": fight,
	"!dueloamuerteconcuchillos": fight,
	"!fight": fight,
	"!test": test
};
let gID: number = 0;

export default (client: Client) => {
	return async (msg: WAWebJS.Message) => {
		console.log();
		const id:number = gID+1;
		gID+=1;
		console.time(`${id} Mensaje`);
		const texto: string = msg.body.toLowerCase();
	
		if(texto == 'a') {
			msg.reply('a')
		}

		if(texto[0] == '!' || texto[0] == '/') {
			let comando: string = texto.split(' ')[0];
			try{
				comandos[comando](msg, id);
			}catch{}
		}
		
		if(texto.indexOf('!p') != -1){
			console.time(`${id} ping`)
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
			console.timeEnd(`${id} ping`)
		}

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
		
		
		const chat: WAWebJS.Chat = await msg.getChat();
		chat.sendSeen();
		console.timeEnd(`${id} Mensaje`)
	}
}
