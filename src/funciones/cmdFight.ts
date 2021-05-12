import WAWebJS from 'whatsapp-web.js';
import deathMessages from '../public/deathMessages.json'


export default async (msg: WAWebJS.Message, id: number): Promise<void> => {
    console.time(`${id} cmdFight`)
    const chat: WAWebJS.Chat = await msg.getChat();
    const user: WAWebJS.Contact = await msg.getContact();
    const fightDeathMessages = deathMessages.fightDeathMessages;
    const mentions = await msg.getMentions();
    let args = msg.body.toLowerCase().split(" ")
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
    console.timeEnd(`${id} cmdFight`)
}