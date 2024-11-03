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
            { protons: 1, neutrons: 0, name: "<sup>1</sup>H" },
            { protons: 1, neutrons: 1, name: "<sup>2</sup>H" },
            { protons: 1, neutrons: 2, name: "<sup>3</sup>H" },
            { protons: 1, neutrons: 3, name: "<sup>4</sup>H" },
            { protons: 1, neutrons: 4, name: "<sup>5</sup>H" },
            { protons: 1, neutrons: 5, name: "<sup>6</sup>H" },
            { protons: 1, neutrons: 6, name: "<sup>7</sup>H" },
        ],
	},
    /*
    2: {
        name: "Helium",
        symbol: "He",
        color: elementColors.nobleGases,
        unlockedAt: 8,
        isotopes: [
            { protons: 2, neutrons: 0, name: "<sup>2</sup>He" },
            { protons: 2, neutrons: 1, name: "<sup>3</sup>He" },
            { protons: 2, neutrons: 2, name: "<sup>4</sup>He" },
            { protons: 2, neutrons: 3, name: "<sup>5</sup>He" },
            { protons: 2, neutrons: 4, name: "<sup>6</sup>He" },
            { protons: 2, neutrons: 5, name: "<sup>7</sup>He" },
            { protons: 2, neutrons: 6, name: "<sup>8</sup>He" },
            { protons: 2, neutrons: 7, name: "<sup>9</sup>He" },
            { protons: 2, neutrons: 8, name: "<sup>10</sup>He" },
        ],
    },
        */
}