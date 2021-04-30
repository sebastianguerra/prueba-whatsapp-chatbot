import WAWebJS from "whatsapp-web.js";

export default async (msg: WAWebJS.Message, chat: WAWebJS.Chat) => {
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
        }else if(quotedMsg.links.length > 0){
            if(quotedMsg.links.length > 1){
                console.log("tiene mas de un enlace")
            }
        }
    }
};