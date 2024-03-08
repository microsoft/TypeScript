// @noEmit: true
// @allowJS: true
// @checkJs: true

// @filename: /a.js
/** @typedef {Object.<string, (n: number) => boolean>} Predicates */

const p = /** @satisfies {Predicates} */ ({
    isEven: n => n % 2 === 0,
    isOdd: n => n % 2 === 1
});
