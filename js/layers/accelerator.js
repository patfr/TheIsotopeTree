"use strict";

{
    const acceleratorRequirements = {
        1: [{name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(1.75e3)}, {hasUpgrade: {layer: "H", id: 15}}],
        2: [{name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(3.5e5)}, {hasUpgrade: {layer: "H", id: 22}}],
        3: [{name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(7.5e6)}, {hasUpgrade: {layer: "H", id: 24}}],
        4: [{name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(4e8)}, {hasUpgrade: {layer: "H", id: 31}}],
        5: [{name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(7.5e10)}, {hasUpgrade: {layer: "H", id: 33}}],
        6: [{name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(1e12)}, {hasUpgrade: {layer: "H", id: 34}}],
    }

    addLayer("accelerator", {
        name: "Accelerator",
        position: 0,
        row: 200,
        type: "custom",
        color: "#559bb5",
        baseAmount: new Decimal(0),
        requires: new Decimal(0),
        startData() { return {
            points: new Decimal(1),
        }},
        getResetGain() {
            return new Decimal(1)
        },
        getNextAt() {
            return new Decimal(0)
        },
        prestigeButtonText() { return tmp.accelerator.canReset ? "Reset progress but fuse all your elements together for an additional Isotope" : "Requirement(s) are not met" },
        canReset() {
            const requirements = acceleratorRequirements[Math.round(player.points.toNumber())] ?? []
            let canReset = true

            requirements.forEach(requirement => {
                if (!requirement.currency && requirement.hasUpgrade)
                {
                    if (!hasUpgrade(requirement.hasUpgrade.layer, requirement.hasUpgrade.id)) {
                        canReset = false

                        return
                    }

                    return
                }

                if (!Decimal.gte(requirement.currency(), requirement.amount)) {
                    canReset = false
                }
            })

            if (requirements.length === 0)
                canReset = false

            return canReset
        },
        update() {
            player.points = player.accelerator.points
        },
        milestones: {
            1: {
                requirementDescription: "2 Isotopes",
                effectDescription: "Double Hydrogen gain. Unlock more Hydrogen upgrades based on Hydrogen Isotopes.",
                done() { return player.accelerator.points.gte(2) },
                unlocked() { return player.accelerator.points.gte(2) },
                style: { "margin": "4px" },
            },
            2: {
                requirementDescription: "3 Isotopes",
                effectDescription: "Double Hydrogen gain. Again.",
                done() { return player.accelerator.points.gte(3) },
                unlocked() { return hasMilestone("accelerator", 1) },
                style: { "margin": "4px" },
            },
            3: {
                requirementDescription: "5 Isotopes",
                effectDescription: "Double Hydrogen gain. Again. Lame.",
                done() { return player.accelerator.points.gte(5) },
                unlocked() { return hasMilestone("accelerator", 1) },
                style: { "margin": "4px" },
            },
        },
        tabFormat: {
            Main: {
                content: () => {                
                    const requirements = acceleratorRequirements[Math.round(player.points.toNumber())] ?? []
                    const components = [
                        ["raw-html", "<h1 style='color: #559bb5'>The Particle Accelerator</h1>"],
                        "blank",
                        ["raw-html", "Meet the requirements to unlock new isotopes. <br>Using The Particle Accelerator will reset unless specified, <br>but gain milestones providing boosts."],
                        "blank",
                        "prestige-button",
                        "blank",
                        ["raw-html", "<i>Visual design for The Particle Accelerator coming v1.1.0</i>"],
                        "blank"
                    ]

                    requirements.forEach(requirement => {
                        if (!requirement.currency && requirement.hasUpgrade)
                        {
                            components.push(["display-text", `Requires ${tmp[requirement.hasUpgrade.layer].upgrades[requirement.hasUpgrade.id].title}`])

                            return
                        }
                        {

                        }

                        components.push(["display-text", `Requires ${requirement.name}: ${formatWhole(requirement.currency())}/${formatWhole(requirement.amount)}`])
                    })

                    return components
                },
            },
            Milestones: {
                content: [
                    "milestones",
                ],
            },
            Isotopes: {
                content: () => {
                    const components = [
                        ["raw-html", "<h1 style='color: #559bb5'>Isotopes</h1>"],
                        "blank",
                        ["raw-html", "Unlocked Isotopes"],
                        "blank",
                    ]

                    let isotopes = 0

                    for (let i = 1; i <= 118; i++) {
                        const element = elements[i]

                        if (!element)
                            continue

                        let acc = ""

                        element.isotopes.forEach(isotope => {
                            if (Decimal.gte(isotopes, player.points)) 
                                return

                            if (acc === "") acc = isotope.name
                            else acc += `, ${isotope.name}`

                            isotopes++
                        })

                        components.push(["raw-html", acc])
                    }

                    return components
                },
            },
        },
    })
}