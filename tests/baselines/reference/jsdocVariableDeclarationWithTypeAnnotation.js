//// [tests/cases/conformance/jsdoc/jsdocVariableDeclarationWithTypeAnnotation.ts] ////

//// [foo.js]
/** @type {boolean} */
var /** @type {string} */ x,
    /** @type {number} */ y;


//// [foo.js]
"use strict";
/** @type {boolean} */
var /** @type {string} */ x, 
/** @type {number} */ y;
