/// <reference path="fourslash.ts" />

//// function foo1 (a: number, b: number) {}
//// function foo2 (c: number, d: number) {}
//// function foo3 (e: number, f: number) {}
//// function foo4 (g: number, h: number) {}
//// function foo5 (i: number, j: number) {}
//// function foo6 (k: number, l: number) {}

//// foo1(/*a*/1, /*b*/2);
//// foo2(/*c*/1, /*d*/2);
//// foo3(/*e*/1, /*f*/2);
//// foo4(/*g*/1, /*h*/2);
//// foo5(/*i*/1, /*j*/2);
//// foo6(/*k*/1, /*l*/2);

const start = test.markerByName('c');
const end = test.markerByName('h');
const span = { start: start.position, length: end.position - start.position };

verify.baselineInlayHints(span, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
