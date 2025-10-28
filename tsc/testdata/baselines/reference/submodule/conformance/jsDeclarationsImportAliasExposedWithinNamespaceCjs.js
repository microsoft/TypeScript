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
export type myTypes = string | RegExp | Array<string | RegExp>;
export type myTypes = {
    prop1: myTypes.typeA;
    prop2: string;
};
export type myTypes = myTypes.typeB | Function;
export declare var myTypes: any;
//// [file2.d.ts]
export type testFnTypes = boolean | myTypes.typeC;
/** @typedef {boolean|myTypes.typeC} testFnTypes.input */
/**
 * @function testFn
 * @description A test function.
 * @param {testFnTypes.input} input - Input.
 * @returns {number|null} Result.
 */
declare function testFn(input: testFnTypes.input): number | null;
declare const _default: {
    testFn: typeof testFn;
    testFnTypes: any;
};
export = _default;
