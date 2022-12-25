import { ApplicationCommandOptionType } from "discord.js"
import { aches } from "../data.js"

export const name = 'giveach'
export const description = 'Give achievements to people'
export const options = [
	{name:'person_id',description:'No description provided.',type:ApplicationCommandOptionType.User, required: true},
	{name:'ach_id',description:'No description provided.',type:ApplicationCommandOptionType.String, required: true},
]
export const default_member_permissions = 8

export async function handler(int, data){
	const user = int.options.getUser('person_id')
	const achname = int.options.getString('ach_id')
	const member = data.getMember(user.id)
	if(!aches[achname])return int.reply('i cant find that achievement! run `/achlist` for all of achievement ids!'), undefined
	const achid = aches[achname]
	if(!(member.achs & 1 << achid))member.totalAches++, member.achs |= 1 << achid
	int.reply({embeds:[{title:'Success!',description:'Successfully set '+achname+' to True for <@'+user.id+'>!'}]})
}