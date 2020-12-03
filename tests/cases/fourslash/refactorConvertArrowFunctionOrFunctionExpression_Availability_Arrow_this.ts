/// <reference path='fourslash.ts' />

//// const bar = 42;
//// const foo = /*x*/(/*w*/) => this.bar;

goTo.select("x", "w");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
