"use strict";

addLayer("accelerator", {
    name: "Accelerator",
    position: 0,
    row: 200,
    type: "custom",
    startData() { return {
		points: new Decimal(0),
    }},
    getResetGain() {
        return new Decimal(0)
    },
    getNextAt() {
        return new Decimal(0)
    },
})