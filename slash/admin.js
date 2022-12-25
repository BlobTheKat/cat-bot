export const name = 'admin'
export const description = 'View admin help'
export const options = []
export const default_member_permissions = 8

export function handler(int){
	int.reply({embeds: [{color: 0x6e593c, title: 'Send Admin Help', description: '<:staring_cat:1043106454493736980>', fields: [{name: 'Admin Commands', value: `**/setup** - makes cat bot send cats in the channel this command is ran in
	**/forget** - reverse of /setup (i forgor :skull:)
	**/summon** - makes cats disappear and reappear out of thin air
	**/giveach** - gib (or take) achievements to people
	**/force** - makes cat appear in chat
	**/say** - chat as cat
	**/reset** - fully resets one's account`}]}]})
}