import { ApplicationCommandOptionType, AttachmentBuilder } from "discord.js"
import fetch from "node-fetch"
export const name = 'tiktok'
export const description = 'Read text as TikTok\'s TTS woman'
export const options = [{name:'text',description:'No description provided.',type:ApplicationCommandOptionType.String, required: true}]

export async function handler(int){
	const {data, error} = await fetch("https://tiktok-tts.weilnet.workers.dev/api/generation", {headers:{"content-type": "application/json"},
  body: "{\"text\":" + JSON.stringify(int.options.getString('text')) + ",\"voice\":\"en_us_001\"}",method:"POST"}).then(a=>a.json())
	if(error)return int.reply('i dont speak your language (remove non-english characters)'), undefined
	int.reply({ files: [new AttachmentBuilder(Buffer.from(data, 'base64'), {name: 'result.mp3'})] })
}