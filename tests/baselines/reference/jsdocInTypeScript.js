//// [jsdocInTypeScript.ts]
// JSDoc typedef tags are not bound TypeScript files.
/** @typedef {function} T */
declare const x: T;

class T {
    prop: number;
}

x.prop;


//// [jsdocInTypeScript.js]
var T = (function () {
    function T() {
    }
    return T;
}());
x.prop;
