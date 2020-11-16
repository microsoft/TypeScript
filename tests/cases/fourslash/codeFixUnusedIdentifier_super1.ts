/// <reference path='fourslash.ts' />

// @noUnusedParameters: true

//// class Base {
////     constructor(x: number) {} // Remove unused parameter
//// }
////
//// class Derived extends Base {
////     constructor(x: number) {
////         super(x);
////     }
//// }

// No codefix to remove a non-last parameter in a callback
verify.codeFixAvailable([{ description: "Prefix 'x' with an underscore" }]);
