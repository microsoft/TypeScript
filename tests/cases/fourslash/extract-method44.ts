/// <reference path='fourslash.ts' />

////function foo() {
////    let x = [1, 2, 3];
////    let y = x.map(e => /*a*/e + e/*b*/);
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Extract Symbol", "function_scope_0", "Extract to inner function in arrow function");
