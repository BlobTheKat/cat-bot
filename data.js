import fs from 'fs/promises'
import { cats } from './cats.js'

function getMember(id){
	if(!this.members[id])memberFixer(this.members[id] = {})
	return this.members[id]
}
export async function guilddata(guild){
	if(!guild.data) dataFixer(guild.data = JSON.parse('' + await fs.readFile('./data/' + guild.id).catch(e =>'{}'))), guild.data.getMember = getMember
}


export function dataFixer(gdata){
	gdata.members ??= {}
	gdata.channels ??= {}
	for(const id in gdata.members) memberFixer(gdata.members[id])
}

export function memberFixer(mdata){
	mdata.cats ??= []
	while(mdata.cats.length < cats.length)mdata.cats.push(0)
	mdata.totalCats ??= 0
	mdata.fastestCatch ??= Infinity
	mdata.slowestCatch ??= 0
	mdata.achs |= 0
	mdata.totalAches ??= 0
}


const guildsToSave = []
setInterval(() => {
	if(!guildsToSave.length)for(const g of bot.guilds.cache.values())guildsToSave.push(g)
	let g = guildsToSave.pop()
	if(!g || !g.data)return //No data :(
	fs.writeFile('./data/' + g.id, JSON.stringify(g.data))
}, 600e3)
export function saveAll(){
	let toSave = 0
	for(const g of bot.guilds.cache.values())
		if(g.data)
			toSave++,
			fs.writeFile('./data/' + g.id, JSON.stringify(g.data))
				.catch(e=>null)
				.then(() => --toSave || process.exit())
	if(!toSave)process.exit()
}
export const achList = [], achCategories = {}
export const aches = JSON.parse(''+await fs.readFile('./aches.json'))
for(let key in aches){
	const catg = aches[key].category
	;(achCategories[catg] || (achCategories[catg] = [])).push(achList.length)
	achList.push(aches[key])
	aches[key] = achList.length - 1
}
export function giveAch(int, achid, id = int.member.id){
	const {data} = int.guild
	const member = data.getMember(id)
	if(member.achs & (1 << achid))return
	member.achs |= 1 << achid
	member.totalAches += achList[achid].category == 'Hidden' ? 32 : 1
	const payload = {embeds:[{
		color: 0x027f0e,
		author: {icon_url: 'https://images-ext-2.discordapp.net/external/TN2X5YsdrCk4v6WHsG_lodEDX1bEpiq0UYwG6e6Sis8/https/pomf2.lain.la/f/hbxyiv9l.png', name: 'Achievement get!'},
		title: achList[achid].title,
		description: achList[achid].description_redacted || achList[achid].description,
		footer: int.member.id != id ? 'unlocked by '+(int.guild.members.cache.get()?.user?.username ?? 'someone else')+', not you' : undefined
	}]}
	if(int.author)int.reply(payload)
	else int.channel.send(payload)
}
