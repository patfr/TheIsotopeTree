"use strict";

{
    const sharedUpgradeStyles = {
        "border-radius": "8px",
        "margin": "4px",
    }
    
    addLayer("H", {
        type: "none",
        name: "Hydrogen",
        resource: "Hydrogen",
        symbol: "H",
        color: elementColors.reactiveNonMetals,
        row: 0,
        position: 0,
        startData() { return {
            points: new Decimal(0),
            unlocked: true,
        }},
        hydrogenBase() {
            let base = new Decimal(1)

            if (hasUpgrade("H", 12)) base = base.add(upgradeEffect("H", 12))
            if (hasUpgrade("H", 22)) base = base.mul(upgradeEffect("H", 22))
            if (hasUpgrade("H", 15)) base = base.add(upgradeEffect("H", 15))

            return base
        },
        hydrogenExp() {
            let exp = new Decimal(1)

            if (hasUpgrade("H", 25)) exp = exp.add(upgradeEffect("H", 25))
            if (hasUpgrade("H", 32)) exp = exp.add(upgradeEffect("H", 32))
            if (hasUpgrade("H", 35)) exp = exp.add(upgradeEffect("H", 35))

            return exp
        },
        hydrogenGain() {
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
            
            gain = gain.pow(tmp.H.hydrogenExp)
            
            if (hasUpgrade("H", 31)) gain = gain.mul(upgradeEffect("H", 31))
            if (hasUpgrade("H", 33)) gain = gain.mul(upgradeEffect("H", 33))

            return gain
        },
        update(delta) {
            if (!player.H.unlocked) 
                return
    
            let gain = tmp.H.hydrogenGain
    
            player.H.points = Decimal.add(player.H.points, Decimal.mul(gain, delta))
        },
        upgrades: {
            11: {
                title: "Hydrogen Upgrade I",
                description() { return !hasUpgrade("H", 24) ? "Double Hydrogen gain." : "Triple Hydrogen gain." },
                cost: new Decimal(30),
                unlocked() { return true },
                effect() { return hasUpgrade("H", 24) ? new Decimal(3) : new Decimal(2) },
                style: sharedUpgradeStyles,
            },
            12: {
                title: "Hydrogen Upgrade II",
                description: "Add +1 to base Hydrogen gain.",
                cost: new Decimal(60),
                unlocked() { return hasUpgrade("H", 11) },
                effect() { return new Decimal(1) },
                style: sharedUpgradeStyles,
            },
            13: {
                title: "Hydrogen Upgrade III",
                description: "Log10(Hydrogen + 1) multiplies Hydrogen gain.",
                cost: new Decimal(120),
                unlocked() { return hasUpgrade("H", 12) },
                effect() { return Decimal.max(player.H.points.add(1).log10(), 1) },
                effectDisplay() { return format(upgradeEffect("H", 13)) + "x" },
                style: sharedUpgradeStyles,
            },
            14: {
                title: "Hydrogen Upgrade IV",
                description: "Multiply Hydrogen by Hydrogen upgrade count.",
                cost: new Decimal(225),
                unlocked() { return hasUpgrade("H", 13) },
                effect() { return player.H.upgrades.length },
                effectDisplay() { return format(upgradeEffect("H", 14)) + "x" },
                style: sharedUpgradeStyles,
            },
            15: {
                title: "Hydrogen Upgrade V",
                description() { return !hasUpgrade("H", 23) ? "Unlock The Particle Accelerator." : "Unlock The Particle Accelerator and ln(Hydrogen + 1) adds to Hydrogen gain base." },
                cost: new Decimal(1.4e3),
                unlocked() { return hasUpgrade("H", 14) },
                effect() { return hasUpgrade("H", 23) ? player.H.points.add(1).ln() : new Decimal(0) },
                effectDisplay() { return hasUpgrade("H", 23) ? "+" + format(upgradeEffect("H", 15)) : "" },
                style: sharedUpgradeStyles,
            },
            21: {
                title: "Hydrogen Upgrade VI",
                description: "Double Hydrogen for each Isotope.",
                cost: new Decimal(4e3),
                unlocked() { return hasUpgrade("H", 15) && player.accelerator.points.gte(2) },
                effect() { return Decimal.pow(2, player.accelerator.points) },
                effectDisplay() { return format(upgradeEffect("H", 21)) + "x" },
                style: sharedUpgradeStyles,
            },
            22: {
                title: "Hydrogen Upgrade VII",
                description: "Multiply base Hydrogen gain by x10.",
                cost: new Decimal(2.5e4),
                unlocked() { return hasUpgrade("H", 21) },
                effect() { return new Decimal(10) },
                style: sharedUpgradeStyles,
            },
            23: {
                title: "Hydrogen Upgrade VIII",
                description: "Hydrogen Upgrade V's now have an addition effect.",
                cost: new Decimal(1.75e6),
                unlocked() { return hasUpgrade("H", 22) && player.accelerator.points.gte(3) },
                style: sharedUpgradeStyles,
            },
            24: {
                title: "Hydrogen Upgrade IX",
                description: "Add +1 to Hydrogen Upgrade I's effect.",
                cost: new Decimal(3.25e6),
                unlocked() { return hasUpgrade("H", 23) },
                style: sharedUpgradeStyles,
            },
            25: {
                title: "Hydrogen Upgrade X",
                description: "Add +0.05 to Hydrogen gain exponent.",
                cost: new Decimal(1.25e7),
                unlocked() { return hasUpgrade("H", 24) && player.accelerator.points.gte(4) },
                effect() { return new Decimal(0.05) },
                style: sharedUpgradeStyles,
            },
            31: {
                title: "Hydrogen Upgrade XI",
                description: "Multiply Hydrogen gain after exponent by x10.",
                cost: new Decimal(3e7),
                unlocked() { return hasUpgrade("H", 25) },
                effect() { return new Decimal(10) },
                style: sharedUpgradeStyles,
            },
            32: {
                title: "Hydrogen Upgrade XII",
                description: "Add +0.05 to Hydrogen gain exponent. Again.",
                cost: new Decimal(2e9),
                unlocked() { return hasUpgrade("H", 31) && player.accelerator.points.gte(5) },
                effect() { return new Decimal(0.05) },
                style: sharedUpgradeStyles,
            },
            33: {
                title: "Hydrogen Upgrade XIII",
                description: "Multiply Hydrogen gain after exponent by x10. Again.",
                cost: new Decimal(5e9),
                unlocked() { return hasUpgrade("H", 32) },
                effect() { return new Decimal(10) },
                style: sharedUpgradeStyles,
            },
            34: {
                title: "Hydrogen Upgrade XIV",
                description: "Unlock Achievements and Multiply Hydrogen gain by x5.",
                cost: new Decimal(1.5e11),
                unlocked() { return hasUpgrade("H", 33) && player.accelerator.points.gte(6) },
                effect() { return new Decimal(5) },
                style: sharedUpgradeStyles,
            },
            35: {
                title: "Hydrogen Upgrade XV",
                description: "Add +0.1 to Hydrogen gain exponent. Again.",
                cost: new Decimal(5e12),
                unlocked() { return hasUpgrade("H", 34) && player.points.gte(7) },
                effect() { return new Decimal(0.1) },
                style: sharedUpgradeStyles,
            },
        },
        tabFormat: [
            "main-display",
            ["raw-html", () => `You are gaining ${format(tmp.H.hydrogenGain)} Hydrogen per second.`],
            "blank",
            "upgrades",
        ],
        unlocked() { return true },
        layerShown() { return true },
    })
}