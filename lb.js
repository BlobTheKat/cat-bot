import { catEmojis } from "./cats.js"

const components = [{data:{type:1},components:[
	{type: 2, custom_id: 'lb_cats', label: 'Cats', style: 1},
	{type: 2, custom_id: 'lb_fastest', label: 'Fastest', style: 1},
	{type: 2, custom_id: 'lb_slowest', label: 'Slowest', style: 1},
]}]
export function leaderboardButtons(){
	for(const i of components[0].components)i.style = 1
	return components
}
export function catLB(data, userid){
	for(const i of components[0].components)i.style = i.custom_id == 'lb_cats' ? 3 : 1
	const top = [], scores = []
	let bestCat = 0, best = []
	let found = true
	for(const id in data.members){
		const {totalCats: score, cats} = data.members[id]
		let rare = cats.length - 1
		while(!cats[rare] && rare)rare--
		if(rare > bestCat)bestCat = rare, best = []
		if(rare == bestCat)best.push(id)
		let idx = scores.findIndex(a => a < score)
		if(idx == -1)idx = scores.length
		top.splice(idx, 0, id)
		scores.splice(idx, 0, score)
	}
	let f = true
	for(let i = 0; i < top.length; i++){
		if(i > 14 && top[i] != userid)f ? top[i] = '...' : top.splice(i--,1), f = false
		top[i] = (top[i] != userid ? i + 1 + '. ' : '**' + (i + 1) + '. ') + scores[i] + ' cats: <@' + top[i] + '>' + (top[i] == userid ? '**' : '')
	}
	if(!best.length)return {embeds:[{color:0x6e593c, title: 'Leaderboards:', description: 'empty :('}], components}
	return {embeds:[{color:0x6e593c, title: 'Leaderboards:', description: `Rarest cat: ${catEmojis[bestCat]} (<@${best.join('>, <@')}>'s)\n${top.join('\n')}`, footer: {text: 'if two people have same amount of cats, nuke output determines who places above'}}], components}
}


export function fastLB(data, userid){
	for(const i of components[0].components)i.style = i.custom_id == 'lb_fastest' ? 3 : 1
	const top = [], scores = []
	let found = true
	for(const id in data.members){
		const {fastestCatch: score} = data.members[id]
		let idx = scores.findIndex(a => a > score)
		if(idx == -1)idx = scores.length
		top.splice(idx, 0, id)
		scores.splice(idx, 0, score)
	}
	let f = true
	for(let i = 0; i < top.length; i++){
		if(i > 14 && top[i] != userid)f ? top[i] = '...' : top.splice(i--,1), f = false
		else top[i] = (top[i] != userid ? i + 1 + '. ' : '**' + (i + 1) + '. ') + Math.round(scores[i] / 10) / 100 + ' sec: <@' + top[i] + '>' + (top[i] == userid ? '**' : '')
	}
	return {embeds:[{color:0x6e593c, title: 'Time Leaderboards:', description: top.join('\n'), footer: {text: 'if two people have same pb, random dad joke determines who places above'}}], components}
}

export function slowLB(data, userid){
	for(const i of components[0].components)i.style = i.custom_id == 'lb_slowest' ? 3 : 1
	const top = [], scores = []
	let found = true
	for(const id in data.members){
		const {slowestCatch: score} = data.members[id]
		let idx = scores.findIndex(a => a < score)
		if(idx == -1)idx = scores.length
		top.splice(idx, 0, id)
		scores.splice(idx, 0, score)
	}
	let f = true
	for(let i = 0; i < top.length; i++){
		if(i > 14 && top[i] != userid)f ? top[i] = '...' : top.splice(i--,1), f = false
		top[i] = (top[i] != userid ? i + 1 + '. ' : '**' + (i + 1) + '. ') + Math.round(scores[i] / 36000) / 100 + ' h: <@' + top[i] + '>' + (top[i] == userid ? '**' : '')
	}
	return {embeds:[{color:0x6e593c, title: 'Slow Leaderboards:', description: top.join('\n'), footer: {text: 'if two people have same pb, vmquan determines who places above'}}], components}
}
