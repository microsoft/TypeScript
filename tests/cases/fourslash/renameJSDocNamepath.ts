// @noLib: true

/// <reference path='fourslash.ts'/>

//// /**
////  * @type {module:foo/A} x
////  */
//// var x = 1
//// var /*0*/A = 0;

verify.baselineRename("0", {});
