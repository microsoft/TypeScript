//// [source.js]
/**
 * Foos a bar together using an `a` and a `b`
 * @param {number} a
 * @param {string} b
 */
export function foo(a, b) {}

/**
 * Legacy - DO NOT USE
 */
export class Aleph {
    /**
     * Impossible to construct.
     * @param {Aleph} a
     * @param {null} b
     */
    constructor(a, b) {
        /**
         * Field is always null
         */
        this.field = b;
    }

    /**
     * Doesn't actually do anything
     * @returns {void}
     */
    doIt() {}
}

/**
 * Not the speed of light
 */
export const c = 12;


//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = exports.Aleph = exports.foo = void 0;
/**
 * Foos a bar together using an `a` and a `b`
 * @param {number} a
 * @param {string} b
 */
function foo(a, b) { }
exports.foo = foo;
/**
 * Legacy - DO NOT USE
 */
var Aleph = /** @class */ (function () {
    /**
     * Impossible to construct.
     * @param {Aleph} a
     * @param {null} b
     */
    function Aleph(a, b) {
        /**
         * Field is always null
         */
        this.field = b;
    }
    /**
     * Doesn't actually do anything
     * @returns {void}
     */
    Aleph.prototype.doIt = function () { };
    return Aleph;
}());
exports.Aleph = Aleph;
/**
 * Not the speed of light
 */
exports.c = 12;


//// [source.d.ts]
/**
 * Foos a bar together using an `a` and a `b`
 * @param {number} a
 * @param {string} b
 */
export function foo(a: number, b: string): void;
/**
 * Legacy - DO NOT USE
 */
export class Aleph {
    /**
     * Impossible to construct.
     * @param {Aleph} a
     * @param {null} b
     */
    constructor(a: Aleph, b: null);
    /**
     * Field is always null
     */
    field: any;
    /**
     * Doesn't actually do anything
     * @returns {void}
     */
    doIt(): void;
}
/**
 * Not the speed of light
 */
export const c: 12;
