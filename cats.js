const allCats = {
	"Fine": 1000,
	"Nice": 750,
	"Good": 500,
	"Rare": 350,
	"Wild": 275,
	"Baby": 230,
	"Epic": 200,
	"Sus": 175,
	"Brave": 150,
	"CatAstley": 125,
	"Reverse": 100,
	"Superior": 80,
	"TheTrashCell": 50,
	"Legendary": 35,
	"Mythic": 25,
	"8bit": 20,
	"Corrupt": 15,
	"Professor": 10,
	"Divine": 8,
	"Real": 5,
	"Ultimate": 3,
	"eGirl": 2
}
export const catRarities = []
export const cats = []
export const catOptions = []
export const catEmojis = [
	"<:finecat:1044237219927429190>",
	"<:nicecat:1044237218694320198>",
	"<:goodcat:1044237217419247626>",
	"<:rarecat:1044237216072859738>",
	"<:wildcat:1044237214986547230>",
	"<:babycat:1044237213719859240>",
	"<:epiccat:1044237211698212906>",
	"<:suscat:1044237210699968512>",
	"<:bravecat:1044237209361993769>",
	"<:rickrollcat:1044237208015613992>",
	"<:reversecat:1044237206358863953>",
	"<:superiorcat:1044237204886671361>",
	"<:thetrashcellcat:1044237204219768843>",
	"<:legendarycat:1044237202323947602>",
	"<:mythiccat:1044237201430544495>",
	"<:8bitcat:1044237199723479061>",
	"<:corruptcat:1044237198796525568>",
	"<:professorcat:1044237197383041175>",
	"<:divinecat:1044237195642408960>",
	"<:realcat:1044237194094710784>",
	"<:ultimatecat:1044237192937095229>",
	"<:egirlcat:1044237191817220097>"
]
let t = 0, i = 0
for(const cat in allCats){
	t += allCats[cat]
	cats.push(cat)
	catRarities.push(t)
	catOptions.push({value:i++,name:cat})
}

export function chooseCat(){
	let choice = Math.floor(Math.random() * t)
	let i = 0
	while(choice >= catRarities[i])i++
	return i
}