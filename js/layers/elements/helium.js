"use strict";

{
    function buyableBackgroundGradient(color1, color2, canBuy) {
        const c1 = canBuy ? color1 : "#4d4d4d"
        const c2 = canBuy ? color2 : "#404040"

        return {
            "background": `linear-gradient(-40deg, ${c1} 0%, ${c1} 40%, ${c2} 40%, ${c2} calc(40% + 40px), ${c1} calc(40% + 40px), ${c1} 100%)`,
            "color": canBuy ? "black" : "white",
        }
    }

    addLayer("He", {
        type: "normal",
        name: "Helium",
        resource: "Helium",
        symbol: "He",
        color: elementColors.nobleGases,
        row: 1,
        position: 0,
        exponent: 0.1,
        componentStyles: {
            "prestige-button": {
                "border-radius": "8px",
            },
            "buyable": {
                "border-radius": "8px",
                "width": "150px",
                "height": "250px",
                "border": "none",
            },
        },
        baseResource: "Hydrogen",
        baseAmount: () => player.H.points,
        requires: () => new Decimal(3.5e13),
        startData: () => ({
            points: new Decimal(0),
            total: new Decimal(0),
            best: new Decimal(0),
            height: {
                points: new Decimal(0),
                best: new Decimal(0),
            },
            unlocked: false,
        }),
        gainMult: () => {
            let mult = new Decimal(1)

            if (hasMilestone("accelerator", 4)) mult = mult.mul(Decimal.pow(2, player.points.sub(8).max(0)))
            
            mult = mult.mul(tmp.He.heightEffect)
            mult = mult.mul(tmp.He.buyables[11].effect)

            return mult
        },
        effect: () => {
            return player.He.total.add(1).pow(.75).max(1)
        },
        effectDescription: () => `which multiplies Hydrogen gain by x${format(tmp.He.effect)}`,
        heightGain: () => {
            let gain = player.He.best

            gain = gain.mul(tmp.He.buyables[12].effect)
            
            if (hasMilestone("He", 3)) gain = gain.mul(3)
            if (hasMilestone("accelerator", 5)) gain = gain.mul(Decimal.pow(2, player.accelerator.points.sub(8).max(0)))
            if (hasMilestone("accelerator", 6)) gain = gain.mul(10)

            return gain
        },
        heightReduction: () => {
            let power = new Decimal(2.5)

            power = power.sub(tmp.He.buyables[13].effect)

            if (hasMilestone("He", 4)) power = power.sub(0.05)

            return power
        },
        heightEffect: () => {
            return player.He.height.best.add(1).cbrt().max(1)
        },
        update: (delta) => {
            if (!player.He.unlocked)
                return

            const power = tmp.He.heightReduction

            player.He.height.points = Decimal.root(player.He.height.points.pow(power).add(Decimal.mul(tmp.He.heightGain, delta).mul(power)), power)


            //const heightGain = Decimal.div(Decimal.mul(tmp.He.heightGain, delta), tmp.He.heightReduction)

            //player.He.height.points = player.He.height.points.add(heightGain)

            if (Decimal.gte(player.He.height.points, player.He.height.best))
                player.He.height.best = player.He.height.points
        },
        milestones: {
            1: {
                requirementDescription: "1 Total Helium (1)",
                effectDescription: "Per Isotope after 7 keep two Hydrogen upgrades on Helium and Accelerator resets.",
                done: () => player.He.total.gte(1),
            },
            2: {
                requirementDescription: "Best Altitude of 5m (2)",
                effectDescription: "Unlock three buyables.",
                done: () => player.He.height.best.gte(5),
            },
            3: {
                requirementDescription: "Best Altitude of 1,000m (3)",
                effectDescription: "x3 Altitude gain.",
                done: () => player.He.height.best.gte(1000),
            },
            4: {
                requirementDescription: "Best Altitude of 12,500m (4)",
                effectDescription: "Subtract 0.05 from altitude reduction power.",
                done: () => player.He.height.best.gte(1.25e4),
            },
            5: {
                requirementDescription: "8 Levels of Helium Purifier (5)",
                effectDescription: "Half the base of the exponent in the Helium Purifier cost formula.",
                done: () => getBuyableAmount("He", 13).gte(8),
            },
        },
        buyables: {
            11: {
                display() { return `
                    <h2>Helium<br>Booster</h2>
                    <br>
                    <h3>Per level gain x3 Helium</h3>
                    <br>
                    <h3>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}</h3>
                    <br>
                    <h3>Cost: ${format(tmp.He.buyables[this.id].cost)}m<br>of altitude</h3>
                    <br>
                    <h3>Effect: x${format(tmp.He.buyables[this.id].effect)}<br> Helium</h3>
                ` },
                purchaseLimit: 5000,
                cost: (x) => Decimal.mul(7.5, Decimal.pow(9, Decimal.pow(x, 1.2))),
                effect: (x) => Decimal.pow(3, x), 
                canAfford() { return player.He.height.points.gte(tmp.He.buyables[this.id].cost) },
                canBuy() { return tmp.He.buyables[this.id].canAfford },
                buy() {
                    if (!this.canAfford())
                        return

                    player.He.height.points = player.He.height.points.sub(this.cost()).max(0)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                style() { return buyableBackgroundGradient("#d4d18a", "#e8e59b", tmp.He.buyables[this.id].canAfford) },
            },
            12: {
                display() { return `
                    <h2>Altitude<br>Booster</h2>
                    <br>
                    <h3>Per level gain x10 Altitude</h3>
                    <br>
                    <h3>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}</h3>
                    <br>
                    <h3>Cost: ${format(tmp.He.buyables[this.id].cost)}<br>Helium</h3>
                    <br>
                    <h3>Effect: x${format(tmp.He.buyables[this.id].effect)}<br> Altitude</h3>
                ` },
                purchaseLimit: 5000,
                cost: (x) => Decimal.mul(50, Decimal.pow(7.5, Decimal.pow(x, 1.2))),
                effect: (x) => Decimal.pow(10, x), 
                canAfford() { return player.He.points.gte(tmp.He.buyables[this.id].cost) },
                canBuy() { return tmp.He.buyables[this.id].canAfford },
                buy() {
                    if (!this.canAfford())
                        return

                    player.He.points = player.He.points.sub(this.cost()).max(0)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                style() { return buyableBackgroundGradient("#8acfc1", "#9de0d3", tmp.He.buyables[this.id].canAfford) },
            },
            13: {
                display() { return `
                    <h2>Helium<br>Purifier</h2>
                    <br>
                    <h3>Per level subtract -0.001 from reduction power</h3>
                    <br>
                    <h3>Level: <br>${formatWhole(getBuyableAmount(this.layer, this.id))} / ${formatWhole(tmp.He.buyables[this.id].purchaseLimit)}</h3>
                    <br>
                    <h3>Cost: ${format(tmp.He.buyables[this.id].cost)}<br>Hydrogen</h3>
                    <br>
                    <h3>Effect: -${format(tmp.He.buyables[this.id].effect)}<br> to reduction power</h3>
                ` },
                purchaseLimit: 100,
                cost: (x) => Decimal.mul(1e15, Decimal.pow(hasMilestone("He", 5) ? 5 : 10, x)),
                effect: (x) => Decimal.mul(0.001, x),
                canAfford() { return player.H.points.gte(tmp.He.buyables[this.id].cost) },
                canBuy() { return tmp.He.buyables[this.id].canAfford },
                buy() {
                    if (!this.canAfford())
                        return

                    player.H.points = player.H.points.sub(this.cost()).max(0)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                },
                style() { return buyableBackgroundGradient("#9d83c9", "#af95db", tmp.He.buyables[this.id].canAfford) },
            },
        },
        infoboxes: {
            lore: {
                title: "Helium",
                body: `<span style="text-align: right">${getFunFacts(2)}<span>`,
                style: { "witdh": "100%", "max-width": "100%" },
            }
        },
        tabFormat: {
            Main: {
                content: [
                    "main-display",
                    "prestige-button",
                    "blank",
                    ["raw-html", () => `You have ${format(player.H.points)} Hydrogen`],
                    "blank",
                    ["raw-html", () => `<span>Your current altitude is </span><h2 style="color: ${elementColors.nobleGases};text-shadow: ${elementColors.nobleGases} 0px 0px 10px">${format(player.He.height.points)}</h2><span>m</span>`],
                    ["raw-html", () => `<span>Your best altitude is </span><h2 style="color: ${elementColors.nobleGases};text-shadow: ${elementColors.nobleGases} 0px 0px 10px">${format(player.He.height.best)}</h2><span>m</span>`],
                    "blank",
                    ["raw-html", () => `You are gaining ${format(tmp.He.heightGain)}m/s of altitude before reduction`],
                    ["raw-html", () => `You are gaining x${format(tmp.He.heightReduction)} less altitude due to your current altitude`],
                    ["raw-html", () => `You are gaining ${format(Decimal.div(tmp.He.heightGain, player.He.height.points.pow(tmp.He.heightReduction.sub(1)).max(1)))}m/s altitude`],
                    ["raw-html", () => `Your altitude is multiplying Helium gain by x${format(tmp.He.heightEffect)}`],
                    "blank",
                    ["raw-html", "<i>Helium buyables are kept on Accelerator resets</i>"],
                    "blank",
                    "buyables",
                    "blank",
                    ["infobox", "lore"],
                    "blank",
                ],
            },
            Milestones: {
                content: [
                    ["raw-html", "<i>Helium milestones are kept upon Accelerator resets</i>"],
                    "blank",
                    "milestones",
                ],
            },
        },
        unlocked: () => Decimal.gte(player.points, 8),
        doReset: (resettingLayer) => {
            if (resettingLayer === "He")
                return

            let keep = ["milestones", "points", "total", "best", "height", "buyables"]

            if (resettingLayer === "accelerator") {
                keep = ["milestones", "buyables"]
                
                if (hasMilestone("accelerator", 6)) keep.push("points", "total", "best")
                if (hasMilestone("accelerator", 7)) keep.push("height")
            }            

            layerDataReset("He", keep)
        },
    })
}