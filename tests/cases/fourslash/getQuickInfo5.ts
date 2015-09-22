/// <reference path='fourslash.ts'/>

////function /**/f(a: {b: number}) { }

goTo.marker();
verify.quickInfoIs('function f(a: {\n    b: number;\n}): void');