// @allowJs: true
// @noEmit: true
// @checkJs: true
// @filename: interfaces.d.ts
export interface Bar {
    prop: string
}

// @filename: usage.js
/** @type {Bar} */
export let bar;

/** @typedef {import('./interfaces').Bar} Bar */