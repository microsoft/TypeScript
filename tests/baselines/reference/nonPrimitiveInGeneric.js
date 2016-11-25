//// [nonPrimitiveInGeneric.ts]
function generic<T>(t: T) {}
var a = {};
var b = "42";

generic<object>({});
generic<object>(a);
generic<object>(123); // expect error
generic<object>(b); // expect error

function bound<T extends object>(t: T) {}

bound({});
bound(a);
bound(123); // expect error
bound(b); // expect error


//// [nonPrimitiveInGeneric.js]
function generic(t) { }
var a = {};
var b = "42";
generic({});
generic(a);
generic(123); // expect error
generic(b); // expect error
function bound(t) { }
bound({});
bound(a);
bound(123); // expect error
bound(b); // expect error
