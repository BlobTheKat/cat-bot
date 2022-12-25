export const name = 'ping'
export const description = 'Pong'
export const options = []

export function handler(int){
	int.reply('cat has brain delay of '+bot.ws.ping+' ms <:staring_cat:1043106454493736980>')
}