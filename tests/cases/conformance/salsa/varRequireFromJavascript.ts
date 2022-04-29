// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @Filename: ex.js
export class Crunch {
    /** @param {number} n */
    constructor(n) {
        this.n = n
    }
    m() {
        return this.n
    }
}

// @Filename: use.js
var ex = require('./ex')

// values work
var crunch = new ex.Crunch(1);
crunch.n


// types work
/**
 * @param {ex.Crunch} wrap
 */
function f(wrap) {
    wrap.n
}
