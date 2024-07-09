/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => {
////     const b = 1;
////     return a + b;
//// };

goTo.select("a", "b");
verify.not.refactorAvailable("Add or remove braces in an arrow function");
