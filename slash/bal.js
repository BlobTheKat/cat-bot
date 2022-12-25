export const name = 'bal'
export const description = 'Get Your balance'
export const options = []

export function handler(int){
	int.reply({embeds: [{color:0x6e593c, title: 'cat coins', image: {url: 'https://media.discordapp.net/attachments/1043090940321075210/1043978294464356493/money.png'}}]})
}