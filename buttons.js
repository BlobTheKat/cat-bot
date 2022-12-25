import { achCategories, achList } from "./data.js"
import { catLB, fastLB, slowLB } from "./lb.js"

const components = [{data:{type:1},components:Object.keys(achCategories).map(a => (
	{type: 2, custom_id: 'ach_' + a.toLowerCase().replace(/\W/g, ''), label: a, style: 1}
))}]
function achPage(catg, member){
	for(const i of components[0].components)i.style = i.label == catg ? 3 : 1
	const fields = achCategories[catg].fmap(a => {
		const earned = member.achs & (1 << a), ach = achList[a]
		return earned || catg != 'Hidden' ? {name: (earned ? '<:cat_trophy:1044534765354745886> ' : '<:no_cat_trophy:1044534771834961960> ') + ach.title,
		value: ach.is_hidden && !earned ? '???' : ach.description, inline: true} : undefined
	})
	return {ephemeral: true, embeds: [{title: catg, description: `${member.totalAches & 31}/${achList.length - achCategories.Hidden.length} + ${member.totalAches >> 5}${catg == 'Hidden' ? '\n\nThis is a "Hidden" category. Achievements here only show up after you complete them.' : ''}`, fields}], components }
}
export function ach(int, data){
	const member = data.getMember(int.user.id)
	int.reply(achPage('Cat Hunt', member))
}
export function ach_cathunt(int, data){
	const member = data.getMember(int.user.id)
	int.update(achPage('Cat Hunt', member))
}
export function ach_random(int, data){
	const member = data.getMember(int.user.id)
	int.update(achPage('Random', member))
}
export function ach_unfair(int, data){
	const member = data.getMember(int.user.id)
	int.update(achPage('Unfair', member))
}
export function ach_hidden(int, data){
	const member = data.getMember(int.user.id)
	int.update(achPage('Hidden', member))
}
export function lb_cats(int, data){
	int.update(catLB(data, int.user.id))
}
export function lb_fastest(int, data){
	int.update(fastLB(data, int.user.id))
}
export function lb_slowest(int, data){
	int.update(slowLB(data, int.user.id))
}
