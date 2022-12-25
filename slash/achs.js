import { ApplicationCommandOptionType } from "discord.js"
import { achCategories, achList } from "../data.js"

export const name = 'achs'
export const description = 'View your achievements'
export const options = []

export async function handler(int, data){
	const udata = data.getMember(int.user.id)
	int.reply({embeds: [{
		title: "Your achievements:",
		color: 0x6e593c,
		description: `${udata.totalAches & 31}/${achList.length - achCategories.Hidden.length} + ${udata.totalAches >> 5}`,
	}], components: [{data:{type:1},components:[{type: 2, custom_id: 'ach', label: 'View all achievements', style: 1}]}]})
}
