/// <reference path='fourslash.ts' />

// Nonexhaustive list of things it should be illegal to be extract-method on

// * Import declarations
// * Super calls
// * Function body blocks
// * try/catch blocks

//// /*1a*/import * as x from 'y';/*1b*/
//// namespace N {
////     /*oka*/class C extends B {
////         constructor() {
////             /*2a*/super();/*2b*/
////         }
////     }/*okb*/
//// }
//// function f() /*3a*/{ return 0 }/*3b*/
//// try /*4a*/{ console.log }/*4b*/ catch (e) /*5a*/{ console.log; }/*5b*/

for (const m of ['1', '2', '3', '4', '5']) {
    goTo.select(m + 'a', m + 'b');
    verify.not.refactorAvailable('Extract Symbol');
}

// Verify we can still extract the entire class
goTo.select('oka', 'okb');
verify.refactorAvailable('Extract Symbol', 'function_scope_0');
