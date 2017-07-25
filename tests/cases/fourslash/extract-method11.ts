/// <reference path='fourslash.ts' />

// Nonexhaustive list of things it should be illegal to be extract-method on

// * Import declarations
// * Super calls
// * Function body blocks

//// /*1a*/import * as x from 'y';/*1b*/
//// namespace N {
////     /*oka*/class C extends B {
////         constructor() {
////             /*2a*/super();/*2b*/
////         }
////     }/*okb*/
//// }
//// function f() /*3a*/{ return 0 }/*3b*/

for (const m of ['1', '2', '3']) {
    goTo.select(m + 'a', m + 'b');
    verify.not.refactorAvailable('Extract Method');
}

// Verify we can still extract the entire class
goTo.select('oka', 'okb');
verify.refactorAvailable('Extract Method');
