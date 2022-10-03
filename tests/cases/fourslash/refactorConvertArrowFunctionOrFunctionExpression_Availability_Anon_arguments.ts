/// <reference path='fourslash.ts' />

////function foo() {
////    return /*a*/(/*b*/) => arguments;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
