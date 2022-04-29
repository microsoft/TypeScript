//// [index.js]
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


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ff = exports.consume = exports.Fs = exports.Second = exports.Target = void 0;
/** @enum {string} */
exports.Target = {
    START: "start",
    MIDDLE: "middle",
    END: "end",
    /** @type {number} */
    OK_I_GUESS: 2
};
/** @enum number */
exports.Second = {
    OK: 1,
    /** @type {number} */
    FINE: 2,
};
/** @enum {function(number): number} */
exports.Fs = {
    ADD1: function (n) { return n + 1; },
    ID: function (n) { return n; },
    SUB1: function (n) { return n - 1; }
};
/**
 * @param {Target} t
 * @param {Second} s
 * @param {Fs} f
 */
function consume(t, s, f) {
    /** @type {string} */
    var str = t;
    /** @type {number} */
    var num = s;
    /** @type {(n: number) => number} */
    var fun = f;
    /** @type {Target} */
    var v = exports.Target.START;
    v = 'something else'; // allowed, like Typescript's classic enums and unlike its string enums
}
exports.consume = consume;
/** @param {string} s */
function ff(s) {
    // element access with arbitrary string is an error only with noImplicitAny
    if (!exports.Target[s]) {
        return null;
    }
    else {
        return exports.Target[s];
    }
}
exports.ff = ff;


//// [index.d.ts]
/**
 * @param {Target} t
 * @param {Second} s
 * @param {Fs} f
 */
export function consume(t: Target, s: Second, f: Fs): void;
/** @param {string} s */
export function ff(s: string): any;
export type Target = string;
export namespace Target {
    const START: string;
    const MIDDLE: string;
    const END: string;
    const OK_I_GUESS: number;
}
export type Second = number;
export namespace Second {
    const OK: number;
    const FINE: number;
}
export type Fs = (arg0: number) => number;
export namespace Fs {
    function ADD1(n: any): any;
    function ID(n: any): any;
    function SUB1(n: any): number;
}
