import { evaluate } from 'mathjs';
import deathMessages from './public/deathMessages.json';
import fight from './fight';
import WAWebJS from 'whatsapp-web.js';

export default async function  (msg: WAWebJS.Message) {
    const user: WAWebJS.Contact = await msg.getContact()
	const texto: string = msg.body.toLowerCase()
	const chat: WAWebJS.Chat = await msg.getChat()

    // Usa msg
	if(texto == 'a') {
		msg.reply('a')
	}

    // Usa msg
	if(texto.startsWith('!help') || texto.startsWith('!h')) {
		msg.reply(
			`!ping -> si el bot esta funcionando responde con 'pong'
Foto + '!sticker' -> envia un sticker creado con la foto`)
	}

    // Usa msg, user y chat
	if(texto.startsWith('!kill') || texto.startsWith('/kill')) {
		const noFightDeathMessages: string[] = deathMessages.deathMessages;
		const mentions: WAWebJS.Contact[] = await msg.getMentions();
		let args: string[] = texto.split(" ")
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
	}

	if(fight.wantsToFight(texto)) fight.fight(texto, msg, chat, user)

    // Usa msg y chat
	if(texto.includes('!sticker')||texto.includes('!stiker')){
		if(msg.hasMedia){
			console.log("Tiene media")
			let media: WAWebJS.MessageMedia = await msg.downloadMedia();
			chat.sendMessage(media, {
				sendMediaAsSticker: true
			});
		}else if(msg.hasQuotedMsg) {
			console.log("Tiene mensaje citado");
			let quotedMsg: WAWebJS.Message = await msg.getQuotedMessage();
			console.log(quotedMsg);
			if(quotedMsg.hasMedia){
				console.log("Mensaje citado tiene media");
				let media:WAWebJS.MessageMedia = await quotedMsg.downloadMedia()
				chat.sendMessage(media, {
					sendMediaAsSticker: true
				})
			}
		}
	}

	if(texto.startsWith('!eval')) {
		let response: string;
		try{
			response = evaluate(msg.body.slice(5)).toString();
		}
		catch {
			response = "No pude resolverlo:( perdoname la vida:c";
		}
		msg.reply(response);
	}

    // Usa msg
	if(texto.includes('linux') ) {
		msg.reply("I use Arch btw");
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


	console.log(user.name || user.pushname, ": ", msg.body);
}
