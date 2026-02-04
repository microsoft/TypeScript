//// [tests/cases/conformance/jsdoc/extendsTag4.ts] ////

//// [foo.js]
/**
 * @constructor
 */
class A {
    constructor() {}
}

/**
 * @extends {A}
 */


//// [foo.js]
"use strict";
/**
 * @constructor
 */
class A {
    constructor() { }
}
/**
 * @extends {A}
 */
