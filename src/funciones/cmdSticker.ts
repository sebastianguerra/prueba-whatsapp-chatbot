import WAWebJS from 'whatsapp-web.js';
import ytdl from 'ytdl-core';
import internal from 'stream';
import path from 'path';
import fs from 'fs';


async function sendStickerOfYT(msg: WAWebJS.Message, chat: WAWebJS.Chat, YTlink: string, id: number) {
    if(!ytdl.validateURL(YTlink)){
        msg.reply("El primer link debe ser de youtube");
    } else {
        console.log("inicia la descarga");
        
        let stream: internal.Readable = ytdl(YTlink);
        stream.pipe(fs.createWriteStream(path.resolve('tmp', `video${id}.mp4`)));
        stream.on('end', () => {
            console.log("Fin de la descarga")
            const mensajeMedia: WAWebJS.MessageMedia = WAWebJS.MessageMedia.fromFilePath(path.resolve('tmp', `video${id}.mp4`));
            chat.sendMessage(mensajeMedia)
                .then(value => {
                    console.log(value, "Enviado")
                })
                .catch(reason => {
                    console.log('Reason', reason)
                })
                .finally(() => {
                    console.log("Fin")
                })
        })
        
    }
}

export default async (msg: WAWebJS.Message, id: number): Promise<void> => {
    console.time(`${id} cmdSticker`)
    const chat: WAWebJS.Chat = await msg.getChat()
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
            let media:WAWebJS.MessageMedia = await quotedMsg.downloadMedia();
            chat.sendMessage(media, {
                sendMediaAsSticker: true
            })
        }else {
            sendStickerOfYT(quotedMsg, chat, quotedMsg.body, id)
        }
    }
    console.timeEnd(`${id} cmdSticker`)
}