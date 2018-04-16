/// <reference path='fourslash.ts' />

//// const foo = /*a*/a/*b*/ => {  };

goTo.select("a", "b");
verify.not.refactorAvailable("Convert arrow function");
