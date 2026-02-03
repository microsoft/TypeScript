//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveIndexingWithForInSupressError.ts] ////

//// [nonPrimitiveIndexingWithForInSupressError.ts]
var a: object = {};

for (var key in a) {
    var value = a[key];
}


//// [nonPrimitiveIndexingWithForInSupressError.js]
"use strict";
var a = {};
for (var key in a) {
    var value = a[key];
}
