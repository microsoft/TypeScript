//// [tests/cases/compiler/forOfSelfReferentialDottedName.ts] ////

//// [forOfSelfReferentialDottedName.ts]
// A self-referential for-of iterable (`for (const a of a)`) plus a call and a
// later narrowing reference must not infinitely recurse in getExplicitTypeOfSymbol.
for (const a of a) {
    a();
    a;
}


//// [forOfSelfReferentialDottedName.js]
"use strict";
// A self-referential for-of iterable (`for (const a of a)`) plus a call and a
// later narrowing reference must not infinitely recurse in getExplicitTypeOfSymbol.
for (const a of a) {
    a();
    a;
}
