"use strict";

let modInfo = {
	name: "The Isotope Tree",
	author: "patfr",
	pointsName: "Isotopes",
	modFiles: (() => {
		const files = []

		Object.keys(elements).forEach(key => {
			files.push(`layers/elements/${elements[key].name.toLowerCase()}.js`)
		})

		files.push("layers/accelerator.js")
		files.push("layers/table.js")
		files.push("layers/achievements.js")
		files.push("tree.js")

		return files
	})(),

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(1),
	offlineLimit: 0,
}

let VERSION = {
	num: "1.0.1",
	name: "Release",
}

let changelog = [
	...getChangelogContent(),
]

let winText = `Congratulations! You have aquired all isotopes, for now...`

let doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

function canGenPoints(){
	return false
}

function getPointGen() {
	return new Decimal(0)
}

function addedPlayerData() { return {
}}

let displayThings = [
]

function isEndgame() {
	return hasUpgrade("H", 35)
}

const backgroundStyle = {

}

function maxTickLength() {
	return(3600)
}

function fixOldSave(oldVersion){
}