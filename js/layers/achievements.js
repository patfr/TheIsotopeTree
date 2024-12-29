"use strict";

{
    addLayer("achievements", { 
        type: "none",
        componentStyles: {
            "achievement": {
                "border-radius": "8px",
                "margin": "4px",
            },
        },
        achievements: {
            11: {
                name: "Hydrogen",
                tooltip: "Get all Hydrogen Isotopes. Reward: Every achievement doubles Hydrogen gain.",
                done() { return player.points.gte(7) && hasUpgrade("H", 34) },
                effect() { return player.achievements.achievements.length },
                unlocked: true,
            },
            12: {
                name: "Helium",
                tooltip: "Get all Helium Isotopes.",
                done() { return player.points.gte(16) && hasUpgrade("H", 34) },
                unlocked: () => hasAchievement("achievements", 11),
            },
        },
        tabFormat: [
            ["raw-html", "<h1 style='color: #f0e269'>Achievements</h1>"],
            "blank",
            "achievements",
        ],
    })
}