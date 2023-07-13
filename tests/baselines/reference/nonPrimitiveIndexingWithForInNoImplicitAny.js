//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveIndexingWithForInNoImplicitAny.ts] ////

//// [nonPrimitiveIndexingWithForInNoImplicitAny.ts]
var a: object;

for (var key in a) {
    var value = a[key]; // error
}


//// [nonPrimitiveIndexingWithForInNoImplicitAny.js]
var a;
for (var key in a) {
    var value = a[key]; // error
}
