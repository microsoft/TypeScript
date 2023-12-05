//// [tests/cases/compiler/prototypes.ts] ////

//// [prototypes.ts]
Object.prototype; // ok
new Object().prototype; // error
function f() {}
f.prototype;

//// [prototypes.js]
Object.prototype; // ok
new Object().prototype; // error
function f() { }
f.prototype;
