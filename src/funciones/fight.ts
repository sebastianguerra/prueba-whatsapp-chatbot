import WAWebJS from 'whatsapp-web.js';
import deathMessages from '../public/deathMessages.json'
export default {
    wantsToFight: (texto: string):boolean=>{
        return texto.startsWith('!fight') || texto.startsWith('/fight') || texto.startsWith('!dueloamuerteconcuchillos')
    },
    fight: async (texto: string, msg: WAWebJS.Message, chat: WAWebJS.Chat, user: WAWebJS.Contact) => {
		const fightDeathMessages = deathMessages.fightDeathMessages;
		const mentions = await msg.getMentions();
		let args = texto.split(" ")
		let mencionoAAlguien = (args.length>1) ? mentions.length > 0 : false;

		if(!mencionoAAlguien) chat.sendMessage(`@${user.id.user} debes mencionar a alguien para luchar!`, {
			mentions: [user]
		})
		else {
			const mention = mentions[0];

            let fighter1 = mention, fighter2 = user;
            if(Math.random()>0.5){
                fighter1 = user;
                fighter2 = mention;
            }

			chat.sendMessage(
                fightDeathMessages[Math.floor(Math.random()*fightDeathMessages.length)]
                    .replace(/%1\$s/g, `@${fighter1.id.user}`)
                    .replace(/%2\$s/g, `@${fighter2.id.user}`), 
                {mentions: [fighter1, fighter2]}
            )

		}
	}
}