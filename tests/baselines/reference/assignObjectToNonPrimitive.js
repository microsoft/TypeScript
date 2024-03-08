//// [tests/cases/conformance/types/nonPrimitive/assignObjectToNonPrimitive.ts] ////

//// [assignObjectToNonPrimitive.ts]
var x = {};
var y = {foo: "bar"};
var a: object;
a = x;
a = y;


//// [assignObjectToNonPrimitive.js]
var x = {};
var y = { foo: "bar" };
var a;
a = x;
a = y;
