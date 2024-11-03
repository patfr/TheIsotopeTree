"use strict";

{
    const sharedAchievementStyles = {
        "border-radius": "8px",
        "margin": "4px",
    }

    addLayer("achievements", { 
        type: "none",
        achievements: {
            11: {
                name: "Hydrogen",
                tooltip: "Get all Hydrogen Isotopes. Reward: Every achievement doubles Hydrogen gain.",
                done() { return player.points.gte(7) && hasUpgrade("H", 34) },
                effect() { return player.achievements.achievements.length },
                unlocked: true,
                style: sharedAchievementStyles,
            },
        },
        tabFormat: [
            ["raw-html", "<h1 style='color: #f0e269'>Achievements</h1>"],
            "blank",
            "achievements",
        ],
    })
}