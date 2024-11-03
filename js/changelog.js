"use strict";

const changelogContent = {
    "v1.0.0": {
        title: "Release",
        added: [
            "Hydrogen Layer", 
            "Hydrogen Isotopes", 
            "The Accelerator", 
            "The Periodic Table", 
            "One Achievement", 
            "Three Milestones", 
            "Fifteen Upgrades",
        ],
        changed: [
            "Endgame to <details style='display: inline'><summary>Spolier click to open</summary>Hydrogen Upgrade XV</details>",
        ],
        technical: [
            "Added changelog system",
        ],
    },
}

function getChangelogContent() {
    const content = []

    Object.keys(changelogContent).forEach(version => {
        if (content.length !== 0)
            content.push("blank", "blank", "blank")
        
        const changelog = changelogContent[version]

        content.push(["raw-html", changelog.title 
            ? `<h2 style="color: #ff7369">${version} - ${changelog.title}</h2>` 
            : `<h2 style="color: #ff7369">${version}</h2>`], "blank", "blank")

        if (changelog.added.length > 0) {
            content.push(["raw-html", "<h3 style='color:#84ff69'>Added</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.added.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`], "blank")
        }

        if (changelog.changed.length > 0) {
            content.push(["raw-html", "<h3 style='color:#e6c377'>Changed</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.changed.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`], "blank")
        }

        if (changelog.technical.length > 0) {
            content.push(["raw-html", "<h3 style='color: #77e6da'>Technical</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.technical.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`])
        }
    })

    return content
}