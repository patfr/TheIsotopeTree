var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,
    treeLayout: "",
}

addLayer("tree-tab", {
    tabFormat: {
        Table: {
            embedLayer: "table",
            buttonStyle: { "border-color": "#3660e0" },
        },
        Accelerator: {
            embedLayer: "accelerator",
            buttonStyle: { "border-color": "#559bb5" },
            unlocked: () => hasUpgrade("H", 15) || player.accelerator.points.gte(2),
        },
        Achievements: {
            embedLayer: "achievements",
            buttonStyle: { "border-color": "#f0e269" },
            unlocked: () => hasUpgrade("H", 34),
        },
        ...(() => {
            const elementTabs = []

            Object.keys(elements).forEach(key => {
                elementTabs[elements[key].symbol] = {
                    embedLayer: elements[key].symbol,
                    unlocked: () => Decimal.gte(player.points, elements[key].unlockedAt),
                    buttonStyle: { "border-color": elements[key].color },
                }
            })

            return elementTabs
        })(),
    },
    previousTab: "",
    leftTab: true,
})