export const name = 'cat'
export const description = 'Get Cat'
export const options = []

export function handler(int){
	int.reply({files:['https://media.discordapp.net/attachments/974777368860319824/1043096254055452742/cat.png']})
}