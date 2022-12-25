export const name = 'help'
export const description = 'Send Help'
export const options = []

export function handler(int){
	int.reply({embeds: [{color: 0x6e593c, title: 'Send Help', description: '<:staring_cat:1043106454493736980>', fields: [{name: 'Cat Hunt Commands', value: `**/inv** - your cats
	**/leaderboards** - da cat leaderboad
	**/donate** - donate your cats to another person
	**/achs** - view your achievements
	**/rain** - get and activate cat rains
	**/feedback** - give suggestions, report bugs, and everything in between`}, {name: 'Info Commands', value: `**/random** - get random cat image
	**right click > apps > catch** - catch someone in 4k
	**/tiktok** - read message as tiktok woman tts
	**/help** - this command
	**/admin** - help for server admins
	**/cat** - get staring cat image
	**/info** - get info bout bot and credits`}]}]})
}