"use strict";

const elementColors = {
    reactiveNonMetals: "#2b4266",
    nobleGases: "#633943",
}

const elements = {
	1: {
        name: "Hydrogen",
		symbol: "H",
        color: elementColors.reactiveNonMetals,
        unlockedAt: 1,
        isotopes: [
            { protons: 1, neutrons: 0 },
            { protons: 1, neutrons: 1 },
            { protons: 1, neutrons: 2 },
            { protons: 1, neutrons: 3 },
            { protons: 1, neutrons: 4 },
            { protons: 1, neutrons: 5 },
            { protons: 1, neutrons: 6 },
        ],
	},
    2: {
        name: "Helium",
        symbol: "He",
        color: elementColors.nobleGases,
        unlockedAt: 8,
        isotopes: [
            { protons: 2, neutrons: 2 },
            { protons: 2, neutrons: 3 },
            { protons: 2, neutrons: 4 },
            { protons: 2, neutrons: 5 },
            { protons: 2, neutrons: 6 },
            { protons: 2, neutrons: 7 },
            { protons: 2, neutrons: 8 },
        ],
    }
}