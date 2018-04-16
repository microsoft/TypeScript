/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => {
////     const b = 1;
////     return a + b;
//// };

goTo.select("a", "b");
verify.not.refactorAvailable("Convert arrow function");
