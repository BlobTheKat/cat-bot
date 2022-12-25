import fetch from 'node-fetch'
import { aches, giveAch } from '../data.js'

export const name = 'random'
export const description = 'Get a random cat'
export const options = []

export function handler(int){
	fetch('https://aws.random.cat/meow').then(a=>a.json()).then(({file}) => {
		int.reply(file)
		giveAch(int, aches.randomizer)
	})
}