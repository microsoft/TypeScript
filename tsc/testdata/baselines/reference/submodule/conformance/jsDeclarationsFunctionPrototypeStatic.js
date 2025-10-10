//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsFunctionPrototypeStatic.ts] ////

//// [source.js]
module.exports = MyClass;

function MyClass() {}
MyClass.staticMethod = function() {}
MyClass.prototype.method = function() {}
MyClass.staticProperty = 123;

/**
 * Callback to be invoked when test execution is complete.
 *
 * @callback DoneCB
 * @param {number} failures - Number of failures that occurred.
 */

//// [source.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
export = MyClass;
module.exports = MyClass;
function MyClass() { }
MyClass.staticMethod = function () { };
MyClass.prototype.method = function () { };
MyClass.staticProperty = 123;
/**
 * Callback to be invoked when test execution is complete.
 *
 * @callback DoneCB
 * @param {number} failures - Number of failures that occurred.
 */ 


//// [source.d.ts]
export = MyClass;
declare function MyClass(): void;
declare namespace MyClass {
    var staticMethod: () => void;
}
declare namespace MyClass {
    var staticProperty: number;
}
export type DoneCB = (failures: number) ;
/**
 * Callback to be invoked when test execution is complete.
 *
 * @callback DoneCB
 * @param {number} failures - Number of failures that occurred.
 */ 
