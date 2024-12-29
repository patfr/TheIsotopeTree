"use strict";

{    
    addLayer("H", {
        type: "none",
        name: "Hydrogen",
        resource: "Hydrogen",
        symbol: "H",
        color: elementColors.reactiveNonMetals,
        row: 0,
        position: 0,
        componentStyles: {
            "upgrade": {
                "border-radius": "8px",
                "margin": "4px",
            },
        },
        startData: () => ({
            points: new Decimal(0),
            total: new Decimal(0),
            best: new Decimal(0),
            unlocked: true,
        }),
        hydrogenBase: () => {
            let base = new Decimal(1)

            if (hasUpgrade("H", 12)) base = base.add(upgradeEffect("H", 12))
            if (hasUpgrade("H", 22)) base = base.mul(upgradeEffect("H", 22))
            if (hasUpgrade("H", 15)) base = base.add(upgradeEffect("H", 15))

            return base
        },
        hydrogenExp:()  => {
            let exp = new Decimal(1)

            if (hasUpgrade("H", 25)) exp = exp.add(upgradeEffect("H", 25))
            if (hasUpgrade("H", 32)) exp = exp.add(upgradeEffect("H", 32))
            if (hasUpgrade("H", 35)) exp = exp.add(upgradeEffect("H", 35))

            return exp
        },
        hydrogenGain: () => {
            let gain = tmp.H.hydrogenBase
    
            if (hasUpgrade("H", 11)) gain = gain.mul(upgradeEffect("H", 11))
            if (hasUpgrade("H", 13)) gain = gain.mul(upgradeEffect("H", 13))
            if (hasUpgrade("H", 14)) gain = gain.mul(upgradeEffect("H", 14))
            if (hasUpgrade("H", 21)) gain = gain.mul(upgradeEffect("H", 21))
            if (hasUpgrade("H", 34)) gain = gain.mul(upgradeEffect("H", 34))
            if (hasMilestone("accelerator", 1)) gain = gain.mul(2)
            if (hasMilestone("accelerator", 2)) gain = gain.mul(2)
            if (hasMilestone("accelerator", 3)) gain = gain.mul(2)
            if (hasAchievement("H", 11)) gain = achievementEffect("H", 11)
            
            gain = gain.mul(tmp.He.effect)
            gain = gain.pow(tmp.H.hydrogenExp)
            
            if (hasUpgrade("H", 31)) gain = gain.mul(upgradeEffect("H", 31))
            if (hasUpgrade("H", 33)) gain = gain.mul(upgradeEffect("H", 33))

            return gain
        },
        update: (delta) => {
            if (!player.H.unlocked) 
                return
    
            let gain = tmp.H.hydrogenGain

            addPoints("H", Decimal.mul(gain, delta))
        },
        upgrades: {
            11: {
                title: "Hydrogen Upgrade I",
                description: () => !hasUpgrade("H", 24) ? "Double Hydrogen gain." : "Triple Hydrogen gain.",
                cost: new Decimal(15),
                unlocked: () => true,
                effect: () => hasUpgrade("H", 24) ? new Decimal(3) : new Decimal(2),
            },
            12: {
                title: "Hydrogen Upgrade II",
                description: "Add +1 to base Hydrogen gain.",
                cost: new Decimal(30),
                unlocked: () => hasUpgrade("H", 11),
                effect: () => new Decimal(1),
            },
            13: {
                title: "Hydrogen Upgrade III",
                description: "Log10(Hydrogen + 1) multiplies Hydrogen gain.",
                cost: new Decimal(80),
                unlocked: () => hasUpgrade("H", 12),
                effect: () => Decimal.max(player.H.points.add(1).log10(), 1),
                effectDisplay: () => format(upgradeEffect("H", 13)) + "x",
            },
            14: {
                title: "Hydrogen Upgrade IV",
                description: "Multiply Hydrogen by Hydrogen upgrade count.",
                cost: new Decimal(225),
                unlocked: () => hasUpgrade("H", 13),
                effect: () => player.H.upgrades.length,
                effectDisplay: () => format(upgradeEffect("H", 14)) + "x",
            },
            15: {
                title: "Hydrogen Upgrade V",
                description() { return !hasUpgrade("H", 23) ? "Unlock The Particle Accelerator." : "Unlock The Particle Accelerator and ln(Hydrogen + 1) adds to Hydrogen gain base." },
                cost: new Decimal(1.4e3),
                unlocked: () => hasUpgrade("H", 14),
                effect: () => hasUpgrade("H", 23) ? player.H.points.add(1).ln() : new Decimal(0),
                effectDisplay: () => hasUpgrade("H", 23) ? "+" + format(upgradeEffect("H", 15)) : "",
            },
            21: {
                title: "Hydrogen Upgrade VI",
                description: "Double Hydrogen for each Isotope.",
                cost: new Decimal(4e3),
                unlocked: () => hasUpgrade("H", 15) && player.accelerator.points.gte(2),
                effect: () => Decimal.pow(2, player.accelerator.points),
                effectDisplay: () => format(upgradeEffect("H", 21)) + "x",
            },
            22: {
                title: "Hydrogen Upgrade VII",
                description: "Multiply base Hydrogen gain by x10.",
                cost: new Decimal(2.5e4),
                unlocked: () => hasUpgrade("H", 21),
                effect: () => new Decimal(10),
            },
            23: {
                title: "Hydrogen Upgrade VIII",
                description: "Hydrogen Upgrade V's now have an addition effect.",
                cost: new Decimal(1.75e6),
                unlocked: () => hasUpgrade("H", 22) && player.accelerator.points.gte(3),
            },
            24: {
                title: "Hydrogen Upgrade IX",
                description: "Add +1 to Hydrogen Upgrade I's effect.",
                cost: new Decimal(3.25e6),
                unlocked: () => hasUpgrade("H", 23),
            },
            25: {
                title: "Hydrogen Upgrade X",
                description: "Add +0.05 to Hydrogen gain exponent.",
                cost: new Decimal(1.25e7),
                unlocked: () => hasUpgrade("H", 24) && player.accelerator.points.gte(4),
                effect: () => new Decimal(0.05),
            },
            31: {
                title: "Hydrogen Upgrade XI",
                description: "Multiply Hydrogen gain after exponent by x10.",
                cost: new Decimal(3e7),
                unlocked: () => hasUpgrade("H", 25),
                effect: () => new Decimal(10),
            },
            32: {
                title: "Hydrogen Upgrade XII",
                description: "Add +0.05 to Hydrogen gain exponent. Again.",
                cost: new Decimal(2e9),
                unlocked: () => hasUpgrade("H", 31) && player.accelerator.points.gte(5),
                effect: () => new Decimal(0.05),
            },
            33: {
                title: "Hydrogen Upgrade XIII",
                description: "Multiply Hydrogen gain after exponent by x10. Again.",
                cost: new Decimal(5e9),
                unlocked: () => hasUpgrade("H", 32),
                effect: () => new Decimal(10),
            },
            34: {
                title: "Hydrogen Upgrade XIV",
                description: "Unlock Achievements and Multiply Hydrogen gain by x5.",
                cost: new Decimal(1.5e11),
                unlocked: () => hasUpgrade("H", 33) && player.accelerator.points.gte(6),
                effect: () => new Decimal(5),
            },
            35: {
                title: "Hydrogen Upgrade XV",
                description: "Add +0.1 to Hydrogen gain exponent. Again.",
                cost: new Decimal(5e12),
                unlocked: () => hasUpgrade("H", 34) && player.points.gte(7),
                effect: () => new Decimal(0.1),
            },
        },
        infoboxes: {
            lore: {
                title: "Hydrogen",
                body: `<span style="text-align: right">${getFunFacts(1)}<span>`,
                style: { "witdh": "100%", "max-width": "100%" },
            }
        },
        tabFormat: {
            Main: {
                content: [
                    "main-display",
                    ["raw-html", () => `You are gaining ${format(tmp.H.hydrogenGain)} Hydrogen per second.`],
                    "blank",
                    "upgrades",
                    "blank",
                    ["infobox", "lore"],
                    "blank",
                ],
            },
        },
        doReset: (resettingLayer) => {
            const keptUpgrades = Math.max(player.accelerator.points.toNumber() - 7, 0) * 2

            layerDataReset("H", [])

            if (hasMilestone("He", 1) && resettingLayer === "accelerator" || resettingLayer === "He")
                player.H.upgrades = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35].slice(0, keptUpgrades)
        },
    })
}