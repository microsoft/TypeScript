// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/** @typedef {{ move(distance: number): void }} Movable */

const car = /** @satisfies {Movable & Record<string, unknown>} */ ({
    start() { },
    move(d) {
        // d should be number
    },
    stop() { }
})
