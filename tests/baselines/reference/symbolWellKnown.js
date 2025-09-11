//// [tests/cases/conformance/es6/Symbols/symbolWellKnown.ts] ////

//// [symbolWellKnown.ts]
var symbol = Symbol();
symbol[Symbol.toStringTag];

var map = new Map();
map[Symbol.toStringTag];

var readonlyMap = <ReadonlyMap<unknown, unknown>>new Map();
readonlyMap[Symbol.toStringTag];

var weakMap = new WeakMap();
weakMap[Symbol.toStringTag];

var set = new Set();
set[Symbol.toStringTag];

var readonlySet = <ReadonlySet<any>>new Set();
readonlySet[Symbol.toStringTag];

var weakSet = new WeakSet();
weakSet[Symbol.toStringTag];

JSON[Symbol.toStringTag];

Math[Symbol.toStringTag];

var promise = new Promise(()=>{});
promise[Symbol.toStringTag];



//// [symbolWellKnown.js]
var symbol = Symbol();
symbol[Symbol.toStringTag];
var map = new Map();
map[Symbol.toStringTag];
var readonlyMap = new Map();
readonlyMap[Symbol.toStringTag];
var weakMap = new WeakMap();
weakMap[Symbol.toStringTag];
var set = new Set();
set[Symbol.toStringTag];
var readonlySet = new Set();
readonlySet[Symbol.toStringTag];
var weakSet = new WeakSet();
weakSet[Symbol.toStringTag];
JSON[Symbol.toStringTag];
Math[Symbol.toStringTag];
var promise = new Promise(() => { });
promise[Symbol.toStringTag];
