import { ApplicationCommandOptionType } from "discord.js"
import { catEmojis, cats } from "../cats.js"
import { achCategories, achList } from "../data.js"

export const name = 'inv'
export const description = 'View your inventory'
export const options = [
	{name:'person_id',description:'No description provided.',type:ApplicationCommandOptionType.User}
]

export async function handler(int, data){
	if(Math.random() < .02)throw "random inv crash"
	const user = int.options.getUser('person_id') || int.user
	const udata = data.getMember(user.id)
	const fields = []
	for(let i = 0; i < udata.cats.length; i++){
		if(udata.cats[i])fields.push({name:catEmojis[i]+' '+cats[i],value:udata.cats[i], inline: true})
	}
	if(!fields.length)fields.push({name:'None',value:'u hav no cats :cat_sad:'})
	int.reply({embeds: [{
		title: user.username + "'s cats:",
		description: `${user.username}'s fastest catch is: ${udata.fastestCatch < Infinity ? Math.round(udata.fastestCatch / 10) / 100 : 'never'} s
		and ${user.username}'s slowest catch is: ${udata.slowestCatch ? Math.round(udata.slowestCatch / 36000) / 100 : 'never'} h
		Achievements unlocked: ${udata.totalAches & 31}/${achList.length - achCategories.Hidden.length} + ${udata.totalAches >> 5}`,
		fields
	}]})
}