/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => {  };

goTo.select("a", "b");
verify.not.refactorAvailable("Add or remove braces in an arrow function");
