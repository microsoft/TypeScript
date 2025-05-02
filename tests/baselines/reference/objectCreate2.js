//// [tests/cases/compiler/objectCreate2.ts] ////

//// [objectCreate2.ts]
declare var union: null | { a: number, b: string };

var n = Object.create(null);             // any
var t = Object.create({ a: 1, b: "" });  // {a: number, b: string }
var u = Object.create(union);            // {a: number, b: string }
var e = Object.create({});               // {}
var o = Object.create(<object>{});       // object

var a = Object.create(null, {});           // any
var a = Object.create({ a: 1, b: "" }, {});
var a = Object.create(union, {});
var a = Object.create({}, {});
var a = Object.create(<object>{}, {});


//// [objectCreate2.js]
var n = Object.create(null); // any
var t = Object.create({ a: 1, b: "" }); // {a: number, b: string }
var u = Object.create(union); // {a: number, b: string }
var e = Object.create({}); // {}
var o = Object.create({}); // object
var a = Object.create(null, {}); // any
var a = Object.create({ a: 1, b: "" }, {});
var a = Object.create(union, {});
var a = Object.create({}, {});
var a = Object.create({}, {});
