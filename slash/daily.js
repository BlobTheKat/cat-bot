import { aches, giveAch } from "../data.js"

export const name = 'daily'
export const description = 'Get Daily cats'
export const options = []

export function handler(int){
	int.reply('there is no daily cats why did you even try this')
	giveAch(int, aches.daily)
}