import { catEmojis, cats, chooseCat } from "../cats.js"

export const name = 'force'
export const description = 'Force cats to appear'
export const options = []
export const default_member_permissions = 8

export function handler(int, data){
	if(data.channels[int.channel.id])return
	int.reply({content:'done',ephemeral:true})
	const cat = chooseCat()
	int.channel.send({content: `${catEmojis[cat]} ${cats[cat]} cat has appeared! Type "cat" to catch it!`, files:['https://media.discordapp.net/attachments/974777368860319824/1043096254055452742/cat.png']}).then(a => {
		data.channels[int.channel.id] = a.id + ':' + cat
	}).catch(e=>null)
}