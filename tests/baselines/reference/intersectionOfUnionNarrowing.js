//// [intersectionOfUnionNarrowing.ts]
interface X {
  a?: { aProp: string };
  b?: { bProp: string };
}
type AorB = { a: object; b: undefined } | { a: undefined; b: object };

declare const q: X & AorB;

if (q.a !== undefined) {
  q.a.aProp;
} else {
  // q.b is previously incorrectly inferred as potentially undefined
  q.b.bProp;
}


//// [intersectionOfUnionNarrowing.js]
"use strict";
if (q.a !== undefined) {
    q.a.aProp;
}
else {
    // q.b is previously incorrectly inferred as potentially undefined
    q.b.bProp;
}
