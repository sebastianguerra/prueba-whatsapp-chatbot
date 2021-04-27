const { evaluate } = require('mathjs');
const deathMessages = require('./deathMessages.json');
const fight = require('./fight');

module.exports = async function  (msg) {
    const user = await msg.getContact()
	const texto = msg.body.toLowerCase()
	const chat = await msg.getChat()

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
		const noFightDeathMessages = deathMessages.deathMessages;
		const mentions = await msg.getMentions();
		args = texto.split(" ")
		mencionoAAlguien = (args.length>1) ? mentions.length > 0 : false;

		if(!mencionoAAlguien) chat.sendMessage(`@${user.id.user} ${noFightDeathMessages[parseInt(Math.random()*noFightDeathMessages.length)]}`, {
			mentions: [user]
		})
		else {
			const mention = mentions[0];
			console.log(mention)
			chat.sendMessage(noFightDeathMessages[parseInt(Math.random()*noFightDeathMessages.length)]
				.replace(/%1\$s/g, `@${user.id.user}`), 
				{mentions: [mention]}
			)

		}
	}

	if(fight.wantsToFight(texto)) fight.fight(texto, msg, chat, user)

    // Usa msg y chat
	if(texto.includes('!sticker')||texto.includes('!stiker')){
		if(msg.hasMedia){
			let media = await msg.downloadMedia()
			chat.sendMessage(media, {
				sendMediaAsSticker: true
			})
		}
	}

	if(texto.startsWith('!eval')) {
		let response
		try{
			response = evaluate(msg.body.slice(5)).toString();
		}
		catch {
			response = "No pude resolverlo:( perdoname la vida:c"
		}
		console.log(response)
		msg.reply(response)
	}

    // Usa msg
	if(texto.includes('linux') ) {
		msg.reply("I use Arch btw")
	}

    // Usa msg
	let matchesPing = texto.match(/!ping/g)
	let matchesPong = texto.match(/!pong/g)
	if(matchesPing && matchesPong) {
        msg.reply(texto
            .replace(/!ping/g, "ahjiuregr8734hkljbval298hahlhg")
            .replace(/!pong/g, "ping")
            .replace(/ahjiuregr8734hkljbval298hahlhg/g, "pong")
        )
    } else{
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
    }


	console.log(user.name || user.pushname, ": ", msg.body);
}
