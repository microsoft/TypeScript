/// <reference path="fourslash.ts"/>

////function* g3() {
/////*1*/    yield   ;
/////*2*/    g3().next(  yield   );
/////*3*/    yield     new Bar;
/////*4*/    yield   *      new Bar;
/////*5*/    yield  *   [new Bar];
/////*6*/    yield+ 1;
/////*7*/    yield++ 1;
////}

format.document();
let expected =
    [
        "    yield;",
        "    g3().next(yield);",
        "    yield new Bar;",
        "    yield* new Bar;",
        "    yield* [new Bar];",
        "    yield + 1;", // Should be "yield +1". This case is covered by bug 3028.
        "    yield ++1;"
    ];

for (let i = 0; i < expected.length; i++) {
    goTo.marker("" + (i + 1));
    verify.currentLineContentIs(expected[i]);
}
