/// <reference path='fourslash.ts' />

//// /*z*/c/*y*/onst /*x*/f/*w*/oo = /*v*/(/*u*//*t*/a/*s*/, b) /*r*/=/*q*/> /*p*/4/*o*/2;

goTo.select("z", "y");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("x", "w");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("v", "u");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("t", "s");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("r", "q");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");

goTo.select("p", "o");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to named function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to anonymous function");
verify.not.refactorAvailable("Convert arrow function or function expression", "Convert to arrow function");
