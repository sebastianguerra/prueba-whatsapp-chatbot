# Bot Whatsapp
(Necesitas [Node js](https://nodejs.org/en/) instalado si lo quieres instalar/ejecutar)

<br/>

***
## Para instalarlo:

### Si tienes [git](https://git-scm.com/):
```bash
git clone https://github.com/sebastianguerra/prueba-whatsapp-chatbot.git
```

### Si no tienes [git](https://git-scm.com/):  
- Descarga el .zip desde el boton verde del repositorio y descomprimelo en la carpeta donde guardaras el proyecto

<br/>

Luego desde cmd (Windows) o terminal (Linux o Mac) dirigete al directorio donde instalaste el proyecto y ejecuta:
- `npm install` (Instala todas las dependencias necesarias para que funcione el codigo).
- `npm run build`  (Transpila el codigo de ts a js).
- `npm run getSession`  (Muestra un codigo qr por pantalla que debes escanear con whatsapp para obtener la sesion (En tu app de whatsapp te dira que se ha iniciado sesion desde un navegador Google Chrome en Mac OS)).

<br/>

***

## Para solo ejecutarlo si ya lo tienes instalado:
- `npm start`

<br/>

***

## Para actualizarlo:
Si no tienes conocimientos basicos de git puedes eliminar la carpeta del proyecto y repetir los pasos de la instalacion

<br/>

***
## Comandos:
- ### !ping  
    Sirve para saber si el bot esta respondiendo. 
- ### !sticker
    Si lo envias como mensaje en una foto o video a un chat donde este el bot, este envia un sticker creado con la foto/video.
    Tambien sirve si respondes con !sticker a un mensaje con archivos multimedia
- ### !eval \<expresion>
    Responde con el resultado de la expresion.  
    El bot usa la funcion [evaluate](https://mathjs.org/docs/reference/functions/evaluate.html) de [mathjs](https://mathjs.org/).
- ### !fight \<usuario>
    El bot envia un mensaje aleatorio de src/public/deathMessages.json['fightDeathMessages'] con una probabilidad del 50% de que muera el usuario que envio el mensaje o el que fue mencionado
- ### !help
    Responde con un mensaje expplicando los comandos
- ### !kill
    El bot envia un mensaje aleatorio de src/public/deathMessages.json['deathMessages']