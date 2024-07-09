// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index.js
/** @enum {string} */
export const Target = {
    START: "start",
    MIDDLE: "middle",
    END: "end",
    /** @type {number} */
    OK_I_GUESS: 2
}
/** @enum number */
export const Second = {
    OK: 1,
    /** @type {number} */
    FINE: 2,
}
/** @enum {function(number): number} */
export const Fs = {
    ADD1: n => n + 1,
    ID: n => n,
    SUB1: n => n - 1
}

/**
 * @param {Target} t
 * @param {Second} s
 * @param {Fs} f
 */
export function consume(t,s,f) {
    /** @type {string} */
    var str = t
    /** @type {number} */
    var num = s
    /** @type {(n: number) => number} */
    var fun = f
    /** @type {Target} */
    var v = Target.START
    v = 'something else' // allowed, like Typescript's classic enums and unlike its string enums
}
/** @param {string} s */
export function ff(s) {
    // element access with arbitrary string is an error only with noImplicitAny
    if (!Target[s]) {
        return null
    }
    else {
        return Target[s]
    }
}
