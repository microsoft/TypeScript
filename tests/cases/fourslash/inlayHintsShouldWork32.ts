/// <reference path="fourslash.ts" />

//// function foo1 (a: number, b: number) {}
//// function foo2 (c: number, d: number) {}
//// function foo3 (e: number, f: number) {}
//// function foo4 (g: number, h: number) {}
//// function foo5 (i: number, j: number) {}
//// function foo6 (k: number, i: number) {}

//// function c1 () { foo1(/*a*/1, /*b*/2); }
//// function c2 () { foo2(/*c*/1, /*d*/2); }
//// function c3 () { foo3(/*e*/1, /*f*/2); }
//// function c4 () { foo4(/*g*/1, /*h*/2); }
//// function c5 () { foo5(/*i*/1, /*j*/2); }
//// function c6 () { foo6(/*k*/1, /*l*/2); }

const start = test.markerByName('c');
const end = test.markerByName('h');
const span = { start: start.position, length: end.position - start.position };

verify.baselineInlayHints(span, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
})
