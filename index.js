import { BitField, Client, GatewayIntentBits, InteractionType, REST, Routes } from 'discord.js'
import fs from 'fs/promises'
import { repl } from 'basic-repl'
import { aches, giveAch, guilddata, saveAll } from './data.js'
import { tick } from "./tick.js"
import { catEmojis, cats } from './cats.js'
import * as buttons from './buttons.js'

Array.prototype.fmap = function(fn){
	const arr = []
	let i = 0
	for(let v of this){
		const s = fn(v, i++, this)
		if(s === undefined)continue
		arr.push(s)
	}
	return arr
}

const DEV_GUILD = ''//'/guilds/990208714768269342'
const TOKEN = (await fs.readFile('./TOKEN')).toString().trim()
globalThis.bot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages]})
function guildcount(){
	bot.user.setPresence({ status: "online", game: { type: "PLAYING", name: "/help | Providing life support for "+bot.guilds.cache.size+" servers" } })
}
bot.on('guildCreate', guildcount)
bot.on('guildDelete', guildcount)
bot.once('ready', () => {
	bot.user.discriminator = '9575'
	PING = '<@' + bot.user.id + '>'
	guildcount()
	console.log('Bot logged in as \x1b[34m' + bot.user.username + '\x1b[33m#' + bot.user.discriminator + '\x1b[m')
	tick()
})
const handlers = new Map(), ids = JSON.parse(''+await fs.readFile('./cmdcache.json'))
let saving = 0
const rest = new REST({ version: '10' }).setToken(TOKEN)
;(async () => {for await(const {filename} of fs.watch('slash', {recursive: true})){
	import('./slash/'+filename+'?v='+Date.now()).then(async a => {
		if(!a.name)return
		const {id} = ids[a.name] ? await rest.patch('/applications/1043087115447181362' + DEV_GUILD + '/commands/' + ids[a.name], {body: a}) : await rest.post('/applications/1043087115447181362' + DEV_GUILD + '/commands', {body: a})
		console.log('\x1b[32mUpdated /'+a.name+' command\x1b[m')
		handlers.delete(ids[a.name])
		handlers.set(id, a.handler)
		ids[a.name] = id
		if(saving)return saving = 2, undefined
		saving = 2
		while(saving == 2){
			saving = 1
			await fs.writeFile('./cmdcache.json', JSON.stringify(ids))
		}
		saving = 0
	})
}})()
fs.readdir('slash').then(files => Promise.all(files.map(f => import('./slash/'+f))).then(cmds => {
	for(const cmd of cmds)ids[cmd.name] && handlers.set(ids[cmd.name], cmd.handler)
	if(process.argv[2])rest.put('/applications/1043087115447181362' + DEV_GUILD + '/commands', { body: cmds }).then(async data => {
		for(let i = 0; i < data.length; i++){
			handlers.set(data[i].id, cmds[i].handler)
			ids[data[i].name] = data[i].id
		}
		console.log('\x1b[32m' + cmds.length + ' slash command'+(cmds.length==1?'':'s')+' reloaded\x1b[m')
		if(saving)return saving = 2, undefined
		saving = 2
		while(saving == 2){
			saving = 1
			await fs.writeFile('./cmdcache.json', JSON.stringify(ids))
		}
		saving = 0
	}).catch(e=>{console.error('\x1b[31m',e)})
}))
let PING = '\0'
const illegals = ['bk', 'bq', 'bx', 'cb', 'cf', 'cg', 'cj', 'cp', 'cv', 'cw', 'cx', 'dx', 'fk', 'fq', 'fv', 'fx', 'fz', 'gq', 'gv', 'gx', 'hk', 'hv', 'hx', 'hz', 'iy', 'jb', 'jc', 'jd', 'jf', 'jg', 'jh', 'jk', 'jl', 'jm', 'jn', 'jp', 'jq', 'jr', 'js', 'jt', 'jv', 'jw', 'jx', 'jy', 'jz', 'kq', 'kv', 'kx', 'kz', 'lq', 'lx', 'mg', 'mj', 'mq', 'mx', 'mz', 'pq', 'pv', 'px', 'qb', 'qc', 'qd', 'qe', 'qf', 'qg', 'qh', 'qj', 'qk', 'ql', 'qm', 'qn', 'qo', 'qp', 'qr', 'qs', 'qt', 'qv', 'qw', 'qx', 'qy', 'qz', 'sx', 'sz', 'tq', 'tx', 'vb', 'vc', 'vd', 'vf', 'vg', 'vh', 'vj', 'vk', 'vm', 'vn', 'vp', 'vq', 'vt', 'vw', 'vx', 'vz', 'wq', 'wv', 'wx', 'wz', 'xb', 'xg', 'xj', 'xk', 'xv', 'xz', 'yq', 'yv', 'yz', 'zb', 'zc', 'zg', 'zh', 'zj', 'zn', 'zq', 'zr', 'zs', 'zx']
function isSpam(txt){
	if(/\W/.test(txt))return
	txt = txt.toLowerCase()
	let illegalCount = 0
	for(const i of illegals)if(txt.includes(i))illegalCount++
	if(illegalCount > 2)return true
	let vowels = /aeiou/y, vowelCount = 0
	while(vowels.test(txt))vowelCount++
	return txt.length / vowelCount <= 3 && txt.length / (txt.length - vowelCount) >= 6
}

bot.on('messageCreate', async msg => {
	if(!msg.guild)return msg.channel.send('good job! please send "lol_i_have_dmed_the_cat_bot_and_got_an_ach" in server to get your ach!')
	await guilddata(msg.guild)
	if(isSpam(msg.content))msg.react('<:staring_cat:1043106454493736980>')
	if(/cat$/yi.test(msg.content)){
		const channels = msg.guild.data.channels
		if(channels[msg.channel.id]){
			const member = msg.guild.data.getMember(msg.author.id)
			const [mid, cat] = channels[msg.channel.id].split(':')
			channels[msg.channel.id] = ''
			msg.delete().catch(e=>null)
			msg.channel.messages.fetch(mid).then(a=>a.delete()).catch(e=>null)
			const time = Date.now() - Math.floor(+mid/4194304+1420070400000)
			if(time < member.fastestCatch)member.fastestCatch = time
			if(time > member.slowestCatch)member.slowestCatch = time
			if(time < 5000) giveAch(msg, aches.fast_catcher)
			if(time > 36e5) giveAch(msg, aches.slow_catcher)
			member.cats[cat]++
			member.totalCats++

			msg.channel.send(`${msg.author.username}#${msg.author.discriminator} cought ${catEmojis[cat]} ${cats[cat]} cat!!!!1!
You now have ${member.cats[cat]} cats of dat type!!!
this fella was cought in ${time>36e5?Math.floor(time/36e5)+' hours ':''}${time>60e3?Math.floor(time/60e3%60+.00000001)+' minutes ':''}${Math.floor(time/10%6000+.000001)/100} seconds!!!!`)

			if(member.cats.find(a=>!a) === undefined)giveAch(msg, aches.collecter)
		}else msg.react('<:pointlaugh:1044299261363355738>').catch(e=>null)
	}else if(/cart/yi.test(msg.content)){
		msg.reply({embeds: [{color:0x6e593c, title: 'cart!', image: {url: 'https://media.discordapp.net/attachments/1043090940321075210/1043978411518988378/cart.png'}}]})
	}else if(/car/yi.test(msg.content)){
		msg.reply({embeds: [{color:0x6e593c, title: 'car!', image: {url: 'https://media.discordapp.net/attachments/974777368860319824/1043099323279364126/car.png'}}]})
		giveAch(msg, aches.car)
	}else if(msg.content == 'pineapple')giveAch(msg, aches.pineapple)
	else if(msg.content == 'ach')giveAch(msg, aches.test_ach)
	else if(/cellua bad/i.test(msg.content))giveAch(msg, aches.cellua)
	else if(/please do not the cat$/yi.test(msg.content))giveAch(msg, aches.pleasedonotthecat)
	else if(/please do the cat$/yi.test(msg.content))msg.reply({files:['https://media.discordapp.net/attachments/1043475049459499008/1043997416266924132/socialcredit.jpg']})
	else if(/dog/.test(msg.content))giveAch(msg, aches.not_quite)
	else if(msg.content.includes(PING))giveAch(msg, aches.who_ping)
	else if(msg.content == 'catn')giveAch(msg, aches.catn)
	else if(/:staring_cat:/.test(msg.content) && /:place_of_worship:|🛐/.test(msg.content))giveAch(msg, aches.worship)
	else if(msg.content == 'lol_i_have_dmed_the_cat_bot_and_got_an_ach')giveAch(msg, aches.dm)
	else if(msg.content == 'cat!i_like_cat_website')giveAch(msg, aches.website_user)
	else if(msg.content == 'cat!n4lltvuCOKe2iuDCmc6JsU7Jmg4vmFBj8G8l5xvoDHmCoIJMcxkeXZObR6HbIV6')msg.delete().catch(e=>null),giveAch(msg, aches.dataminer)
	else if(/cat\?$/yi.test(msg.content))giveAch(msg, aches['???'])
	else if(/[fϝꜰ𝚏][o𝚘οо◯○օ𝗈੦ഠ໐0][wᥕ𝗐ԝᴡ𝚠][o𝚘οо◯○օ𝗈੦ഠ໐0]/i.test(msg.content))giveAch(msg, aches.fuwu)
	else if(/hey, s[e]x\?|cat s[e]x/i.test(msg.content))giveAch(msg, aches.catsx)
	else if(/cat!sex$/yi.test(msg.content))return msg.reply('...')
})
let notAlloweds = ['try again','absolutely not','403 not allowed', 'why did you click this this arent yours', 'stop', 'you cant', 'can you please stop', 'get a life'], nI = 7
bot.on('interactionCreate', async int => {
	await guilddata(int.guild)
	const dat = int.guild.data
	let f
	if(int.type == InteractionType.MessageComponent){
		if(int.message.interaction && int.message.interaction.user != int.user){
			int.reply({content: notAlloweds[nI = nI+1&7], ephemeral: true})
		 	giveAch(int, aches.curious)
			return
		}
		f = buttons[int.customId]
	}else f = handlers.get(int.commandId)
	if(f)try{await f(int, dat)}catch(e){
		console.error('\x1b[33m' + (e.stack || e) + '\x1b[m')
		int.channel.send('cat crashed lmao\ni send crash reports to milenakos so yes').catch(e=>{})
		giveAch(int, aches.crasher)
	}
	else console.warn('No handler for '+int.commandId)
})
bot.login(TOKEN)
repl('$ ',_=>console.log(eval(_)))
let exiting = false
process.on('SIGINT', () => {
	if(exiting)return console.log('\x1b[33mAlready Shutting down!\ntype process.exit() to quit now')
	exiting = true
	console.log('\x1b[33mShutting down gracefully...')
	saveAll()
})
process.on('uncaughtException', e => {
	console.error('\x1b[31m' + (e.stack || e) + '\x1b[m')
})
