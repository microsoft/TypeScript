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
/**
 * Foos a bar together using an `a` and a `b`
 * @param {number} a
 * @param {string} b
 */
export function foo(a, b) { }
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
    doIt() { }
}
/**
 * Not the speed of light
 */
export const c = 12;


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
