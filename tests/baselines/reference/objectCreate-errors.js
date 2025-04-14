//// [tests/cases/compiler/objectCreate-errors.ts] ////

//// [objectCreate-errors.ts]
var e1 = Object.create(1);               // Error
var e2 = Object.create("string");        // Error
var e3 = Object.create(false);           // Error
var e4 = Object.create(undefined);       // Error

 
var e5 = Object.create(1, {});           // Error
var e6 = Object.create("string", {});    // Error
var e7 = Object.create(false, {});       // Error
var e8 = Object.create(undefined, {});   // Error

//// [objectCreate-errors.js]
var e1 = Object.create(1); // Error
var e2 = Object.create("string"); // Error
var e3 = Object.create(false); // Error
var e4 = Object.create(undefined); // Error
var e5 = Object.create(1, {}); // Error
var e6 = Object.create("string", {}); // Error
var e7 = Object.create(false, {}); // Error
var e8 = Object.create(undefined, {}); // Error
