//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionJSDoc.ts] ////

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
exports.c = exports.Aleph = void 0;
exports.foo = foo;
/**
 * Foos a bar together using an `a` and a `b`
 * @param {number} a
 * @param {string} b
 */
function foo(a, b) { }
/**
 * Legacy - DO NOT USE
 */
class Aleph {
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
    doIt() { }
}
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
export declare function foo(a: number, b: string): void;
/**
 * Legacy - DO NOT USE
 */
export declare class Aleph {
    /**
     * Impossible to construct.
     * @param {Aleph} a
     * @param {null} b
     */
    constructor(a: Aleph, b: null);
    /**
     * Doesn't actually do anything
     * @returns {void}
     */
    doIt(): void;
}
/**
 * Not the speed of light
 */
export declare const c = 12;
