// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true

// @Filename: functions.js

/**
 * @param {function(this: string, number): number} c is just passing on through
 * @return {function(this: string, number): number}
 */
function id1(c) {
    return c
}

var x = id1(function (n) { return this.length + n });

/**
 * @param {function(new: { length: number }, number): number} c is just passing on through
 * @return {function(new: { length: number }, number): number}
 */
function id2(c) {
    return c
}

class C {
    /** @param {number} n */
    constructor(n) {
        this.length = n;
    }
}

var y = id2(C);
var z = new y(12);
z.length;

/** @type {function ("a" | "b", 1 | 2): 3 | 4} */
var f = function (ab, onetwo) { return ab === "a" ? 3 : 4;  }
