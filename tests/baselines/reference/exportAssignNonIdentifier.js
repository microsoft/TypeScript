//// [tests/cases/conformance/externalModules/exportAssignNonIdentifier.ts] ////

//// [foo1.ts]
var x = 10;
export = typeof x; // Ok

//// [foo2.ts]
export = "sausages"; // Ok

//// [foo3.ts]
export = class Foo3 {}; // Error, not an expression

//// [foo4.ts]
export = true; // Ok

//// [foo5.ts]
export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript

//// [foo6.ts]
export = void; // Error, void operator requires an argument

//// [foo7.ts]
export = Date || String; // Ok

//// [foo8.ts]
export = null; // Ok



//// [foo1.js]
var x = 10;
export {};
//// [foo2.js]
export {};
//// [foo3.js]
export {};
//// [foo4.js]
export {};
//// [foo5.js]
export {};
//// [foo6.js]
export {};
//// [foo7.js]
export {};
//// [foo8.js]
export {};
