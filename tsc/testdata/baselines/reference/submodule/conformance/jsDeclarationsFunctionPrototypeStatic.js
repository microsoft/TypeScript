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
/**
 * Callback to be invoked when test execution is complete.
 *
 * @callback DoneCB
 * @param {number} failures - Number of failures that occurred.
 */ 


//// [DtsFileErrors]


out/source.d.ts(1,10): error TS2304: Cannot find name 'MyClass'.


==== out/source.d.ts (1 errors) ====
    export = MyClass;
             ~~~~~~~
!!! error TS2304: Cannot find name 'MyClass'.
    /**
     * Callback to be invoked when test execution is complete.
     *
     * @callback DoneCB
     * @param {number} failures - Number of failures that occurred.
     */ 
    