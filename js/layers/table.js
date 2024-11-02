"use strict";

const sharedStyles = {
    "border-radius": "8px",
    "width": "60px",
    "height": "60px",
    "min-height": "60px",
    "font-size": "12px",
    "margin": "4px",
}

const blank = ["blank", ["68px", "68px"]]
const clickable = (id) => ["clickable", id]

function blanks(amount) {
    const blanks = []

    for (let i = 0; i < amount; i++) {
        blanks.push(blank)
    }

    return blanks
}

function clickables(start, amount) {
    const clickables = []

    for (let i = start; i < start + amount; i++) {
        clickables.push(clickable(i))
    }

    return clickables
}

addLayer("table", {
    type: "none",
    tabFormat: [
        ["column", [
            ["row", [
                clickable(1),
                ...blanks(16),
                clickable(2),
            ]],
            ["row", [
                ...clickables(3, 2),
                ...blanks(10),
                ...clickables(5, 6),
            ]],
            ["row", [
                ...clickables(11, 2),
                ...blanks(10),
                ...clickables(13, 6),
            ]],
            ["row", [
                ...clickables(19, 18),
            ]],
            ["row", [
                ...clickables(37, 18),
            ]],
            ["row", [
                ...clickables(55, 2),
                blank,
                ...clickables(72, 15),
            ]],
            ["row", [
                ...clickables(87, 2),
                blank,
                ...clickables(104, 15),
            ]],
            ["row", [
                blank,
            ]],
            ["row", [
                ...blanks(3),
                ...clickables(57, 15),
            ]],
            ["row", [
                ...blanks(3),
                ...clickables(90, 15),
            ]],
        ]],
    ],
    clickables: (() => {
        const clickables = {}

        for (let i = 1; i <= 118; i++) {
            const clickable = {}
            const element = elements[i]

            clickable.locked = !element 
                ? true 
                : () => !Decimal.gte(player.points, element.unlockedAt)

            clickable.display = !element 
                ? "<b>Locked</b>" 
                : () => tmp.table.clickables[i].locked 
                    ? `<b>Locked</b><br>Req: ${element.unlockedAt}`
                    : `<h1>${element.symbol}</h1>`

            clickable.style = () => tmp.table.clickables[i].locked
                ? {
                    "background-color": "#404040",
                    "color": "#000000",
                    ...sharedStyles,
                } 
                : {
                    "background-color": element.color,
                    "color": "#ffffff",
                    ...sharedStyles,
                }

            clickable.canClick = () => !tmp.table.clickables[i].locked
            clickable.onClick = () => { player.subtabs["tree-tab"].mainTabs = element.symbol }

            clickables[i] = clickable
        }

        return clickables
    })(),
})