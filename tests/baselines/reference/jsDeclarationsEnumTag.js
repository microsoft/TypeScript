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
export function consume(t: string, s: number, f: (arg0: number) => number): void;
export function ff(s: string): any;
export const Target: {
    START: string;
    MIDDLE: string;
    END: string;
    /** @type {number} */
    OK_I_GUESS: number;
};
export enum Target {
}
export const Second: {
    OK: number;
    /** @type {number} */
    FINE: number;
};
export enum Second {
}
export const Fs: {
    ADD1: (n: any) => any;
    ID: (n: any) => any;
    SUB1: (n: any) => number;
};
export enum Fs {
}


//// [DtsFileErrors]


out/index.d.ts(3,14): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
out/index.d.ts(10,13): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
out/index.d.ts(12,14): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
out/index.d.ts(17,13): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
out/index.d.ts(19,14): error TS2567: Enum declarations can only merge with namespace or other enum declarations.
out/index.d.ts(24,13): error TS2567: Enum declarations can only merge with namespace or other enum declarations.


==== ./out/index.d.ts (6 errors) ====
    export function consume(t: string, s: number, f: (arg0: number) => number): void;
    export function ff(s: string): any;
    export const Target: {
                 ~~~~~~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
        START: string;
        MIDDLE: string;
        END: string;
        /** @type {number} */
        OK_I_GUESS: number;
    };
    export enum Target {
                ~~~~~~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
    }
    export const Second: {
                 ~~~~~~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
        OK: number;
        /** @type {number} */
        FINE: number;
    };
    export enum Second {
                ~~~~~~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
    }
    export const Fs: {
                 ~~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
        ADD1: (n: any) => any;
        ID: (n: any) => any;
        SUB1: (n: any) => number;
    };
    export enum Fs {
                ~~
!!! error TS2567: Enum declarations can only merge with namespace or other enum declarations.
    }
    