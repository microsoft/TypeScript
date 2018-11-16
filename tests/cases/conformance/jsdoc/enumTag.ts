// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: a.js
/** @enum {string} */
const Target = {
    START: "start",
    MIDDLE: "middle",
    END: "end",
    MISTAKE: 1,
    /** @type {number} */
    OK_I_GUESS: 2
}
/** @enum number */
const Second = {
    MISTAKE: "end",
    OK: 1,
    /** @type {number} */
    FINE: 2,
}
/** @enum {function(number): number} */
const Fs = {
    ADD1: n => n + 1,
    ID: n => n,
    SUB1: n => n - 1
}

/** @param {Target} t
 * @param {Second} s
 * @param {Fs} f
 */
function consume(t,s,f) {
    /** @type {string} */
    var str = t
    /** @type {number} */
    var num = s
    /** @type {(n: number) => number} */
    var fun = f
    /** @type {Target} */
    var v = Target.START
    v = Target.UNKNOWN // error, can't find 'UNKNOWN'
    v = Second.MISTAKE // meh..ok, I guess?
    v = 'something else' // allowed, like Typescript's classic enums and unlike its string enums
}
/** @param {string} s */
function ff(s) {
    // element access with arbitrary string is an error only with noImplicitAny
    if (!Target[s]) {
        return null
    }
    else {
        return Target[s]
    }
}


