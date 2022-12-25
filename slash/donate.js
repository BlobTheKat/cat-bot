import { ApplicationCommandOptionType } from "discord.js"
import { catOptions, cats } from "../cats.js"
import { aches, giveAch } from "../data.js"

export const name = 'donate'
export const description = 'give cats now'
export const options = [
	{name:'person',description:'No description provided.',type:ApplicationCommandOptionType.User, required: true},
	{name:'cat_type',description:'No description provided.',type:ApplicationCommandOptionType.Integer, required: true, choices: catOptions},
	{name:'amount',description:'No description provided.',type:ApplicationCommandOptionType.Integer, required: false}
]
export const default_member_permissions = 8

export async function handler(int, data){
	const user = int.options.getUser('person')
	const amount = int.options.getInteger('amount') ?? 1
	const type = int.options.getInteger('cat_type')
	const from = data.getMember(int.user.id)
	const to = data.getMember(user.id)
	if(amount <= 0 || from.cats[type] < amount)return int.reply({content:'no',ephemeral:true})
	to.cats[type] += amount
	to.totalCats += amount
	from.cats[type] -= amount
	from.totalCats -= amount
	if(amount >= 5 && type == 20 && user.id == bot.user.id)giveAch(int, data, int.user.id, aches.rich)
	int.reply({embeds:[{color:0x6e593c,title:'Success!',description:'Successfully transfered '+amount+' '+cats[type]+' cats from <@' + int.user.id + '> to <@' + user.id + '>!'}]})
	giveAch(int, aches.donator)
	giveAch(int, aches.anti_donator, user.id)
}