export const name = 'info'
export const description = 'View information about the bot'
export const options = []

export function handler(int){
	int.reply({embeds: [{color: 0x6e593c, title: 'Cat Bot', description: `Bot made by Milenakos#3310
This bot adds Cat Hunt to your server with many different types of cats for people to discover! People can see leaderboards and give cats to each other.

Thanks to:
**???** for the cat image
**SLOTHS2005#1326** for getting troh to add cat as an emoji
**aws.random.cat** for random cats API
**TheTrashCell#0001** for having many great ideas and other stuff

**crazydiamond469#9999, Filibuster Obstructa#9474, SLOTHS2005#1326, Frinkifail#9518, Aflyde#3846, TheTrashCell#0001 and PotatoPot#2356** for being test monkeys

**And everyone for the support!**`}]})
}