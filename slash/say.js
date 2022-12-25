import { ApplicationCommandOptionType } from "discord.js"

export const name = 'say'
export const description = 'Say stuff as cat'
export const options = [{name:'text',description:'No description provided.',type:ApplicationCommandOptionType.String, required: true}]
export const default_member_permissions = 8

export function handler(int){
	int.channel.send(int.options.getString('text')).catch(e=>null)
	int.reply({ content: 'success', ephemeral: true })
}