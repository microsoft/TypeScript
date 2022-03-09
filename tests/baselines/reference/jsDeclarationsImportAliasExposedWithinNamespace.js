//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsImportAliasExposedWithinNamespace.ts] ////

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

export {myTypes};
//// [file2.js]
import {myTypes} from './file.js';

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

export {testFn, testFnTypes};



//// [file.d.ts]
export namespace myTypes {
    type typeA = string | RegExp | Array<string | RegExp>;
    type typeB = {
        /**
         * - Prop 1.
         */
        prop1: myTypes.typeA;
        /**
         * - Prop 2.
         */
        prop2: string;
    };
    type typeC = myTypes.typeB | Function;
    const myTypes: {
        [x: string]: any;
    };
}
//// [file2.d.ts]
export namespace testFnTypes {
    type input = boolean | myTypes.typeC;
}
/** @typedef {boolean|myTypes.typeC} testFnTypes.input */
/**
 * @function testFn
 * @description A test function.
 * @param {testFnTypes.input} input - Input.
 * @returns {number|null} Result.
 */
export function testFn(input: testFnTypes.input): number | null;
import { myTypes } from "./file.js";
/**
 * @namespace testFnTypes
 * @global
 * @type {Object<string,*>}
 */
export const testFnTypes: {
    [x: string]: any;
};
