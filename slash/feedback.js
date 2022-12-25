import { ApplicationCommandOptionType } from "discord.js"

export const name = 'feedback'
export const description = 'Give feedback, report bugs or suggest ideas'
export const options = [{name:'feedback',description:'No description provided.',type:ApplicationCommandOptionType.String, required: true}]

export function handler(int){
	const feedback = int.options.getString('feedback')
	if(feedback.length > 2000)throw "oopsie woopsie too big feedback"
	console.log('\x1b[32mNew feedback:\x1b[m',feedback)
	int.reply('your feedback was directed to the bot owner!')
}