import { ApplicationCommandOptionType } from "discord.js"
import { catOptions, cats } from "../cats.js"

export const name = 'summon'
export const description = 'Give cats to people'
export const options = [
	{name:'person_id',description:'No description provided.',type:ApplicationCommandOptionType.User, required: true},
	{name:'amount',description:'No description provided.',type:ApplicationCommandOptionType.Integer, required: true},
	{name:'cat_type',description:'No description provided.',type:ApplicationCommandOptionType.Integer, required: true, choices: catOptions}
]
export const default_member_permissions = 8

export async function handler(int, data){
	const user = int.options.getUser('person_id')
	const amount = int.options.getInteger('amount')
	const type = int.options.getInteger('cat_type')
	const member = data.getMember(user.id)
	member.cats[type] += amount
	member.totalCats += amount
	int.reply({embeds:[{title:'Success!',description:'gave '+user.id+' '+amount+' '+cats[type]+' cats'}]})
}