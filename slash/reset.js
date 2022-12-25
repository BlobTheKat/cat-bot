import { ApplicationCommandOptionType } from "discord.js"

export const name = 'reset'
export const description = 'Reset people'
export const options = [
	{name:'person_id',description:'No description provided.',type:ApplicationCommandOptionType.User, required: true}
]
export const default_member_permissions = 8

export async function handler(int, data){
	const user = int.options.getUser('person_id')
	if(!data.members[user.id])throw 'dammit nothin to reset'
	delete data.members[user.id]
	int.reply({embeds:[{color: 0x6e593c,description:'Done! rip <@'+user.id+'>. f\'s in chat.'}]})
}