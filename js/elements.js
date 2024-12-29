"use strict";

const elements = {}

const elementColors = {
    reactiveNonMetals: "#2b4266",
    nobleGases: "#633943",
}

const elementDefinitions = [
	{
        name: "Hydrogen",
		symbol: "H",
        discovered: "x/x/1766",
        discoveredBy: "Henry Cavendish",
        discoveredUsing: "Reacting zinc metal with hydrochloric acid",
        extraInformation: "The first element on the periodic table",
        color: elementColors.reactiveNonMetals,
        isotopes: [0, 1, 2, 3, 4, 5, 6],
	},
    {
        name: "Helium",
        symbol: "He",
        discovered: "18/7/1868",
        discoveredBy: "Pierre J. C. Janssen",
        discoveredUsing: "Observing a solar eclipse",
        extraInformation: "The first of the noble gases",
        color: elementColors.nobleGases,
        isotopes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    },
]

let count = 0;

elementDefinitions.forEach((element, index) => {
    elements[index + 1] = {
        ...element,
        unlockedAt: count + 1,
        isotopes: (() => {
            const isotopes = []

            for (let i = 0; i < element.isotopes.length; i++) {
                isotopes.push({
                    protons: index + 1,
                    neutrons: element.isotopes[i],
                    name: `<sup>${index + 1 + element.isotopes[i]}</sup>${element.symbol}`,
                })
            }

            count += element.isotopes.length

            return isotopes
        })(),
    }
})

function getFunFacts(elementIndex) {
    const element = elements[elementIndex]

    if (!element)
        return "No fun facts available"

    return `Discovered: ${element.discovered}<br>Discovered by: ${element.discoveredBy}<br>How it was discovered: ${element.discoveredUsing}<br>Extra information: ${element.extraInformation}`
}