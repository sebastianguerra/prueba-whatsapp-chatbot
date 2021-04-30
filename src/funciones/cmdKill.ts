import WAWebJS from 'whatsapp-web.js';
import deathMessages from '../public/deathMessages.json';

export default async(msg: WAWebJS.Message) => {
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
}