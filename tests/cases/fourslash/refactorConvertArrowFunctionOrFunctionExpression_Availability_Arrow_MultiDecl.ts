/// <reference path='fourslash.ts' />

//// /*z*/l/*y*/et /*x*/f/*w*/oo, /*v*/b/*u*/ar = /*t*/(/*s*/) => 42;

goTo.select("z", "y");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("x", "w");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("v", "u");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("t", "s");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
