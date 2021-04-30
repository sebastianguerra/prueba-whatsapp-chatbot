import WAWebJS from 'whatsapp-web.js';
import { evaluate } from 'mathjs';

export default (msg: WAWebJS.Message) => {
    let response: string;
    try{
        response = evaluate(msg.body.slice(5)).toString();
    }
    catch {
        response = "No pude resolverlo:( perdoname la vida:c";
    }
    msg.reply(response);
}