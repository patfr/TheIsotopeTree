"use strict";

{
    const acceleratorRequirements = {
        // Hydrogen Isotopes
        1: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(1.75e3) }, { type: "upgrade", layer: "H", id: 15 }],
        2: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(3.5e5) }, { type: "upgrade", layer: "H", id: 22 }],
        3: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(7.5e6) }, { type: "upgrade", layer: "H", id: 24 }],
        4: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(4e8) }, { type: "upgrade", layer: "H", id: 31 }],
        5: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(7.5e10) }, { type: "upgrade", layer: "H", id: 33 }],
        6: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(1e12) }, { type: "upgrade", layer: "H", id: 34 }],

        // Helium Isotopes
        7: [{ type: "currency", name: "Hydrogen", currency: () => player.H.points, amount: new Decimal(3.5e13) }, { type: "upgrade", layer: "H", id: 35 }],
        8: [{ type: "currency", name: "Helium", currency: () => player.He.points, amount: new Decimal(10) }],
        9: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(500) }],
        10: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(5e3) }],
        11: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(1.5e5) }],
        12: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(1.5e6) }],
        13: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(2e7) }],
        14: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(2e8) }],
        15: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(1e10) }, { type: "currency", name: "Helium", currency: () => player.He.points, amount: new Decimal(1e11)}],
        
        // Lithium Isotopes
        //16: [{ type: "currency", name: "Altitude", currency: () => player.He.height.points, amount: new Decimal(2e10) }, { type: "currency", name: "Helium", currency: () => player.He.points, amount: new Decimal(2.5e11)}],
    }

    function getCurrentRequirements() {
        return acceleratorRequirements[Math.round(player.points.toNumber())] ?? []
    }

    function meetsRequirement(requirement) {
        switch (requirement.type) {
            case "currency":
                return Decimal.gte(requirement.currency(), requirement.amount)
            case "upgrade":
                return hasUpgrade(requirement.layer, requirement.id)
            default:
                return false
        }
    }

    function meetsAllRequirements() {
        const requirements = getCurrentRequirements()

        if (requirements.length === 0)
            return false

        for (let i = 0; i < requirements.length; i++) {
            if (!meetsRequirement(requirements[i]))
                return false
        }

        return true
    }

    function requirementText(requirement) {
        switch (requirement.type) {
            case "currency":
                return `${requirement.name}: ${formatWhole(requirement.currency())}/${formatWhole(requirement.amount)}`
            case "upgrade":
                return `Requires ${tmp[requirement.layer].upgrades[requirement.id].title}`
            default:
                return undefined
        }
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
        canReset: () => meetsAllRequirements(),
        update() {
            player.points = player.accelerator.points
        },
        milestones: {
            1: {
                requirementDescription: "2 Isotopes (1)",
                effectDescription: "Double Hydrogen gain. Unlock more Hydrogen upgrades based on Hydrogen Isotopes.",
                done() { return player.accelerator.points.gte(2) },
                unlocked() { return player.accelerator.points.gte(2) },
            },
            2: {
                requirementDescription: "3 Isotopes (2)",
                effectDescription: "Double Hydrogen gain. Again.",
                done() { return player.accelerator.points.gte(3) },
                unlocked() { return hasMilestone("accelerator", 1) },
            },
            3: {
                requirementDescription: "5 Isotopes (3)",
                effectDescription: "Double Hydrogen gain. Again. Lame.",
                done() { return player.accelerator.points.gte(5) },
                unlocked() { return hasMilestone("accelerator", 2) },
            },
            4: {
                requirementDescription: "9 Isotopes (4)",
                effectDescription: "Double Helium gain per Isotope after 8.",
                done() { return player.accelerator.points.gte(9) },
                unlocked() { return hasMilestone("accelerator", 3) },
            },
            5: {
                requirementDescription: "11 Isotopes (5)",
                effectDescription: "Double Altitude gain per Isotope after 8.",
                done() { return player.accelerator.points.gte(11) },
                unlocked() { return hasMilestone("accelerator", 4) },
            },
            6: {
                requirementDescription: "14 Isotopes (6)",
                effectDescription: "x10 Altitude gain. Keep Helium.",
                done() { return player.accelerator.points.gte(14) },
                unlocked() { return hasMilestone("accelerator", 5) },
            },
            7: {
                requirementDescription: "16 Isotopes (7)",
                effectDescription: "Keep Altitude.",
                done() { return player.accelerator.points.gte(16) },
                unlocked() { return hasMilestone("accelerator", 6) },
            },
        },
        bars: {
            progress1: {
                direction: RIGHT,
                width: 20,
                height: 200,
                progress() { return 0.5 },
                unlocked() { return false },
            },
            progress2: {
                direction: RIGHT,
                width: 20,
                height: 200,
                progress() { return 0.5 },
                unlocked() { return false },
            },
        },
        tabFormat: {
            Main: {
                content: () => {                
                    const requirements = getCurrentRequirements()
                    const components = [
                        ["raw-html", "<h1 style='color: #559bb5'>The Particle Accelerator</h1>"],
                        "blank",
                        ["raw-html", "Meet the requirements to unlock new isotopes. <br>Using The Particle Accelerator will reset unless specified, <br>but gain milestones providing boosts."],
                        "blank",
                        ...(() => {
                            if (requirements.length === 0)
                                return [["raw-html", "<i>No requirements</i>"]]

                            return requirements.map(requirement => {
                                const text = requirementText(requirement)

                                if (text)
                                    return ["raw-html", text]
                            })
                        })(),
                        "blank",
                        "particle-accelerator",
                        "blank",
                        ["raw-html", "<i>Particle Accelerator animation coming in the future</i>"],
                        "blank",
                    ]

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
        doReset: (resettingLayer) => {
            
        },
    })
}