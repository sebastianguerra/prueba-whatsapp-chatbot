import WAWebJS from 'whatsapp-web.js';


export default (msg: WAWebJS.Message, id: number): void => {
    console.time(`${id} cmdHelp`)
    msg.reply(
    `!ping -> si el bot esta funcionando responde con 'pong'\nFoto + '!sticker' -> envia un sticker creado con la foto`)
    console.timeEnd(`${id} cmdHelp`)
}