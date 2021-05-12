import WAWebJS from 'whatsapp-web.js';
import path from 'path';

export default async (msg: WAWebJS.Message, id: number) => {
    const chat:WAWebJS.Chat = await msg.getChat();
    const media:WAWebJS.MessageMedia = WAWebJS.MessageMedia.fromFilePath(path.resolve('media', 'video.mp4'));
    chat.sendMessage(media);
}