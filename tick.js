import { catEmojis, cats, chooseCat } from "./cats.js";
import { guilddata } from "./data.js"

export function tick(){
	for(const g of bot.guilds.cache.values()){
		guilddata(g).then(() => {
			for(const ch in g.data.channels){
				if(g.data.channels[ch])continue
				const channel = g.channels.cache.get(ch)
				if(!channel){delete g.data.channels[ch]; continue}
				const cat = chooseCat()
				channel.send({content: `${catEmojis[cat]} ${cats[cat]} cat has appeared! Type "cat" to catch it!`, files:['https://media.discordapp.net/attachments/974777368860319824/1043096254055452742/cat.png']}).then(a => {
					g.data.channels[ch] = a.id + ':' + cat
				}).catch(e=>null)
			}
		})
	}
	setTimeout(tick, Math.random() * 1080e3 + 120e3)
}