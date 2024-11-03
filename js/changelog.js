"use strict";

const changelogContent = {
    "v1.0.1": {
        date: "03/11/24",
        fixes: [
            "Achievements now show when they should",
            "Hydrogen Upgrade V no longer shows effect when it shouldn't",
        ],
        technical: [
            "Added fixes to the changelog system",
            "Added date to the changelog system",
        ],
    },
    "v1.0.0": {
        title: "Release",
        date: "03/11/24",
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
            ? `<h2 style="color: #ff7369">${version} - ${changelog.title} - ${changelog.date}</h2>` 
            : `<h2 style="color: #ff7369">${version} - ${changelog.date}</h2>`], "blank", "blank")

        if (changelog.added && changelog.added.length > 0) {
            content.push(["raw-html", "<h3 style='color:#84ff69'>Added</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.added.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`], "blank")
        }

        if (changelog.changed && changelog.changed.length > 0) {
            content.push(["raw-html", "<h3 style='color:#e6c377'>Changed</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.changed.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`], "blank")
        }

        if (changelog.fixes && changelog.fixes.length > 0) {
            content.push(["raw-html", "<h3 style='color:#f2e97e'>Fixes</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.fixes.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`], "blank")
        }

        if (changelog.technical && changelog.technical.length > 0) {
            content.push(["raw-html", "<h3 style='color: #77e6da'>Technical</h3>"], "blank")

            content.push(["raw-html", `<ul style="padding-left: 0">${changelog.technical.reduce((acc, v) => `${acc}<li style="text-align: left; color: #bdbdbd">- ${v}</li>`, "")}</ul>`])
        }
    })

    return content
}