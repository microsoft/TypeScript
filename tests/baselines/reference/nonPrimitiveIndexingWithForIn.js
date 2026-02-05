//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveIndexingWithForIn.ts] ////

//// [nonPrimitiveIndexingWithForIn.ts]
var a: object;

for (var key in a) {
    var value = a[key];
}


//// [nonPrimitiveIndexingWithForIn.js]
"use strict";
var a;
for (var key in a) {
    var value = a[key];
}
