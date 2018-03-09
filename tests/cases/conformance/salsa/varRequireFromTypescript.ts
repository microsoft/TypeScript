// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @Filename: ex.d.ts
export type Greatest = { day: 1 }
export class Crunch {
    n: number
    m(): number
    constructor(n: number)
}

// @Filename: use.js
var ex = require('./ex')

// values work
var crunch = new ex.Crunch(1);
crunch.n


// types work
/**
 * @param {ex.Greatest} greatest
 * @param {ex.Crunch} wrap
 */
function f(greatest, wrap) {
    greatest.day
    wrap.n
}
