//// [tests/cases/compiler/prettyFormatLongTypes.ts] ////

//// [prettyFormatLongTypes.ts]
let a = { b: { c: { e: { f: 123 } } } };
let b = { b: { c: { e: { f: "123" } } } };
let c = "test";

// both the source and target types are wide enough enough trigger pretty printing
a = b;

// only the source type is wide enough to trigger pretty printing
a = c;

// only the target type is wide enough to trigger pretty printing
c = a;

// neither the source nor the target type is wide enough to trigger pretty printing
c = false;


//// [prettyFormatLongTypes.js]
var a = { b: { c: { e: { f: 123 } } } };
var b = { b: { c: { e: { f: "123" } } } };
var c = "test";
// both the source and target types are wide enough enough trigger pretty printing
a = b;
// only the source type is wide enough to trigger pretty printing
a = c;
// only the target type is wide enough to trigger pretty printing
c = a;
// neither the source nor the target type is wide enough to trigger pretty printing
c = false;
