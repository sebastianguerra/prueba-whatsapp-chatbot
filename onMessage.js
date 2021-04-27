const { evaluate } = require('mathjs');
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
		const deathMessages = [
			"was pricked to death", 
			"drowned",
			"experienced kinetic energy",
			"blew up",
			"hit the ground too hard",
			"fell from a high place",
			"fell off a ladder",
			"fell off some vines",
			"fell off some weeping vines",
			"fell off scaffolding",
			"fell while climbing",
			"was squashed b a falling anvil",
			"was squashed by a falling block",
			"went up in flames",
			"burned to death",
			"tried to swim in lava",
			"was struck by lightning",
			"discovered the floor was lava",
			"was killed by magic",
		]
		const mentions = await msg.getMentions();
		args = texto.split(" ")
		mencionoAAlguien = (args.length>1) ? mentions.length > 0 : false;

		if(!mencionoAAlguien) chat.sendMessage(`@${user.id.user} ${deathMessages[parseInt(Math.random()*deathMessages.length)]}`, {
			mentions: [user]
		})
		else {
			const mention = mentions[0];
			console.log(mention)
			chat.sendMessage(`@${mention.id.user} ${deathMessages[parseInt(Math.random()*deathMessages.length)]}`, {
			mentions: [mention]
		})

		}
	}

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
