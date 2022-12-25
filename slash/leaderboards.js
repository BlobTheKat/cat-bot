import { catLB, leaderboardButtons } from "../lb.js"

export const name = 'leaderboards'
export const description = 'View the leaderboards'
export const options = []

export function handler(int, data){
	int.reply({embeds:[{color:0x6e593c,title:'The Leaderboards',description:'select your leaderboard using buttons below'}], components: leaderboardButtons()})
}