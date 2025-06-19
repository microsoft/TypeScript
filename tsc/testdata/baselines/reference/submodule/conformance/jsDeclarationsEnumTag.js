//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsEnumTag.ts] ////

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
exports.Fs = exports.Second = exports.Target = void 0;
exports.consume = consume;
exports.ff = ff;
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
    ADD1: n => n + 1,
    ID: n => n,
    SUB1: n => n - 1
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


//// [index.d.ts]
/** @enum {string} */
export declare const Target: {
    START: string;
    MIDDLE: string;
    END: string;
    /** @type {number} */
    OK_I_GUESS: number;
};
/** @enum number */
export declare const Second: {
    OK: number;
    /** @type {number} */
    FINE: number;
};
/** @enum {function(number): number} */
export declare const Fs: {
    ADD1: (n: any) => any;
    ID: (n: any) => any;
    SUB1: (n: any) => number;
};
/**
 * @param {Target} t
 * @param {Second} s
 * @param {Fs} f
 */
export declare function consume(t: Target, s: Second, f: Fs): void;
/** @param {string} s */
export declare function ff(s: string): any;
