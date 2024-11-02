var layoutInfo = {
    startTab: "Table",
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
        },
        ...(() => {
            const elementTabs = []

            Object.keys(elements).forEach(key => {
                elementTabs[elements[key].symbol] = {
                    embedLayer: elements[key].symbol,
                    unlocked: () => player.subtabs["tree-tab"].mainTabs === elements[key].symbol,
                    buttonStyle: { "border-color": elements[key].color },
                }
            })

            return elementTabs
        })(),
    },
    previousTab: "",
    leftTab: true,
})