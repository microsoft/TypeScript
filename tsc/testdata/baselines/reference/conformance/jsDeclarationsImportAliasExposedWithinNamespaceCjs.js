//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsImportAliasExposedWithinNamespaceCjs.ts] ////

//// [file.js]
/**
 * @namespace myTypes
 * @global
 * @type {Object<string,*>}
 */
const myTypes = {
    // SOME PROPS HERE
};

/** @typedef {string|RegExp|Array<string|RegExp>} myTypes.typeA */

/**
 * @typedef myTypes.typeB
 * @property {myTypes.typeA}    prop1 - Prop 1.
 * @property {string}           prop2 - Prop 2.
 */

/** @typedef {myTypes.typeB|Function} myTypes.typeC */

exports.myTypes = myTypes;
//// [file2.js]
const {myTypes} = require('./file.js');

/**
 * @namespace testFnTypes
 * @global
 * @type {Object<string,*>}
 */
const testFnTypes = {
    // SOME PROPS HERE
};

/** @typedef {boolean|myTypes.typeC} testFnTypes.input */

/**
 * @function testFn
 * @description A test function.
 * @param {testFnTypes.input} input - Input.
 * @returns {number|null} Result.
 */
function testFn(input) {
    if (typeof input === 'number') {
        return 2 * input;
    } else {
        return null;
    }
}

module.exports = {testFn, testFnTypes};



//// [file.d.ts]
export { myTypes };
/**
 * @namespace myTypes
 * @global
 * @type {Object<string,*>}
 */
declare const myTypes: Record<string, any>;
export declare namespace myTypes {
    /** @typedef {string|RegExp|Array<string|RegExp>} myTypes.typeA */
    export type typeA = string | RegExp | Array<string | RegExp>;
}
export declare namespace myTypes {
    /**
     * @typedef myTypes.typeB
     * @property {myTypes.typeA}    prop1 - Prop 1.
     * @property {string}           prop2 - Prop 2.
     */
    export type typeB = {
        /**
         * - Prop 1.
         */
        prop1: myTypes.typeA;
        /**
         * - Prop 2.
         */
        prop2: string;
    };
}
export declare namespace myTypes {
    /** @typedef {myTypes.typeB|Function} myTypes.typeC */
    export type typeC = myTypes.typeB | Function;
}
//// [file2.d.ts]
declare const _exports: {
    testFn: typeof testFn;
    testFnTypes: Record<string, any>;
};
export = _exports;
import { myTypes } from './file.js';
/**
 * @namespace testFnTypes
 * @global
 * @type {Object<string,*>}
 */
declare const testFnTypes: Record<string, any>;
export declare namespace testFnTypes {
    /** @typedef {boolean|myTypes.typeC} testFnTypes.input */
    export type input = boolean | myTypes.typeC;
}
/**
 * @function testFn
 * @description A test function.
 * @param {testFnTypes.input} input - Input.
 * @returns {number|null} Result.
 */
declare function testFn(input: testFnTypes.input): number | null;
