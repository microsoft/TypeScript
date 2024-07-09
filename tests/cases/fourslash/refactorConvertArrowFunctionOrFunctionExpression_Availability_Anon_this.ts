/// <reference path='fourslash.ts' />

//// const foo = /*x*/f/*w*/unction() {
////    this.bar = "F-Express";
////    return this.bar;
//// };

goTo.select("x", "w");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
