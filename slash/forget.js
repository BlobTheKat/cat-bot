export const name = 'forget'
export const description = 'Undo the setup'
export const options = []
export const default_member_permissions = 8

export function handler(int, data){
	if(!(int.channel.id in data.channels))return int.reply('your an idiot there is literally no cat setupped in this channel you stupid'), undefined
	int.reply('ok, now i wont send cats in <#' + int.channel.id + '>')
	delete data.channels[int.channel.id]
}