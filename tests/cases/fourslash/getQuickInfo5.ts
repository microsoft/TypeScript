/// <reference path='fourslash.ts'/>

////function /**/f(a: {b: number}) { }

debugger;
goTo.marker();
verify.quickInfoIs('function f(a: {\n    b: number;\n}): void');