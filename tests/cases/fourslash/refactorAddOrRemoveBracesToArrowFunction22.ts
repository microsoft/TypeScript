/// <reference path='fourslash.ts' />

//// const /*a*/foo/*b*/ = /*c*/(/*d*//*e*/aa/*f*/aa, /*g*/b/*h*/) /*i*//*j*/ /*k*/=>/*l*/ /*m*/{/*n*/ /*o*/return/*p*/ 1; };

goTo.select("a", "b");
verify.not.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("c", "d");
verify.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("e", "f");
verify.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("g", "h");
verify.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("i", "j");
verify.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("k", "l");
verify.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("m", "n");
verify.not.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")

goTo.select("o", "p");
verify.not.refactorAvailable("Add or remove braces in an arrow function", "Remove braces from arrow function")
