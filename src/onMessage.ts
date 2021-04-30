import { evaluate } from 'mathjs';
import WAWebJS, {Client} from 'whatsapp-web.js';
import deathMessages from './public/deathMessages.json';

import fight from './funciones/cmdFight';
import getStickers from './funciones/cmdStickers';


const comandos: {[id: string]:  (msg:WAWebJS.Message)=>void} = {
	"!help" : (msg: WAWebJS.Message) => {
			msg.reply(
			`!ping -> si el bot esta funcionando responde con 'pong'\nFoto + '!sticker' -> envia un sticker creado con la foto`)
		},
	"!eval": (msg: WAWebJS.Message) => {
		let response: string;
		try{
			response = evaluate(msg.body.slice(5)).toString();
		}
		catch {
			response = "No pude resolverlo:( perdoname la vida:c";
		}
		msg.reply(response);
	},
	"!sticker": async (msg: WAWebJS.Message) => {
		const chat: WAWebJS.Chat = await msg.getChat()
		getStickers(msg, chat);
	},
	//"/kill": this["/kill"],
	"!kill": async(msg: WAWebJS.Message) => {
		const chat: WAWebJS.Chat = await msg.getChat()
		const user: WAWebJS.Contact = await msg.getContact()		
		const noFightDeathMessages: string[] = deathMessages.deathMessages;
		const mentions: WAWebJS.Contact[] = await msg.getMentions();
		let args: string[] = msg.body.toLowerCase().split(" ")
		let mencionoAAlguien: boolean = (args.length>1) ? mentions.length > 0 : false;

		if(!mencionoAAlguien)
			chat.sendMessage(noFightDeathMessages[Math.floor(Math.random()*noFightDeathMessages.length)]
				.replace(/%1\$s/g, `@${user.id.user}`), {
				mentions: [user]
			})
		else {
			const mention:WAWebJS.Contact = mentions[0];
			chat.sendMessage(noFightDeathMessages[Math.floor(Math.random()*noFightDeathMessages.length)]
				.replace(/%1\$s/g, `@${mention.id.user}`), 
				{mentions: [mention]}
			)

		}
	},
	//"/fight":
	//"!dueloamuerteconcuchillos":
	"!fight": fight.fight
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
		
		if(texto[0] == '!' || texto[0] == '/') {
			let comando: string = texto.split(' ')[0];
			try{
				comandos[comando](msg);
			} catch {
				console.log("Comando desconocido: ", comando);
			}
		}
	
		const user: WAWebJS.Contact = await msg.getContact();
		console.log(user.name || user.pushname, ": ", msg.body);
	}
}
