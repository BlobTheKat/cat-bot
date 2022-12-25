export const name = 'achlist'
export const description = 'View list of achievements names'
export const options = []
export const default_member_permissions = 8

export function handler(int){
	int.reply({embeds: [{color: 0x6e593c, title: 'Ach IDs', description: `donator - Donator
	anti_donator - Anti-Donator
	randomizer - Randomizer
	pineapple - Pineapple
	fast_catcher - Fast Catcher
	slow_catcher - Slow Catcher
	daily - Daily Catter
	beggar - Beggar
	rich - R I C H
	cellua - CelLua
	collecter - Collecter
	dm - DM
	cancer - Cancer
	who_ping - who ping
	pleasedonotthecat - Please do not the cat
	worship - Cat Worshipper
	test_ach - Test Achievement
	fuwu - fUwU
	crasher - Crasher
	4k - Cought in 4k
	curious - Curious
	car - Car
	catn - Cat'n
	coupon_user - Coupon User
	??? - ???
	not_quite - Not Quite
	dataminer - Dataminer
	website_user - Website User
	secret - Tax Fraud
	trolled - Trolled`}]})
}