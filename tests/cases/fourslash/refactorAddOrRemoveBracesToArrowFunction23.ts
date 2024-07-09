/// <reference path='fourslash.ts' />

//// const /*a*/foo/*b*/ = /*c*/()/*d*/ /*e*//*f*/ /*g*/=>/*h*/ /*i*/1/*j*/;

goTo.select("a", "b");
verify.not.refactorAvailable("Add or remove braces in an arrow function", "Add braces to arrow function")

goTo.select("c", "d");
verify.refactorAvailable("Add or remove braces in an arrow function", "Add braces to arrow function")

goTo.select("e", "f");
verify.refactorAvailable("Add or remove braces in an arrow function", "Add braces to arrow function")

goTo.select("g", "h");
verify.refactorAvailable("Add or remove braces in an arrow function", "Add braces to arrow function")

goTo.select("i", "j");
verify.not.refactorAvailable("Add or remove braces in an arrow function", "Add braces to arrow function")
