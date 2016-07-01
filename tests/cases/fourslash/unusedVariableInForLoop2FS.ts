/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// function f1 () {
////     for(var i = 0, j= 0; ;i++) {
////
////     }
//// }

verify.codeFixAtPosition(`
function f1 () {
    for(var i = 0; ;i++) {

    }
}
`);
