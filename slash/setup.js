export const name = 'setup'
export const description = 'Setup cat in current channel'
export const options = []
export const default_member_permissions = 8

export function handler(int, data){
	if(int.channel.id in data.channels)return int.reply('bruh you already setup cat here are you dumb\n\nthere might already be a cat sitting in chat. type `cat` to catch it.'), undefined
	int.reply('ok, now i will also send cats in <#' + int.channel.id + '>')
	data.channels[int.channel.id] = ''
}