//// [tests/cases/compiler/optionalTupleElementsAndUndefined.ts] ////

//// [optionalTupleElementsAndUndefined.ts]
// Repro from #50753

type UnNullify<T> = { [K in keyof T]: NonNullable<T[K]> };

type Foo = UnNullify<[a: 1, b?: 2 | undefined]>;

type Test = [a: 1, b?: 2] extends Foo ? true : false;  // true

// Types in the following declarations should be identical

var v: [1, 2?];
var v: [1, (2 | undefined)?];
var v: [a: 1, b?: 2];
var v: [a: 1, b?: 2 | undefined];
var v: UnNullify<[1, 2?]>;
var v: UnNullify<[1, (2 | undefined)?]>;
var v: UnNullify<[a: 1, b?: 2]>;
var v: UnNullify<[a: 1, b?: 2 | undefined]>;


//// [optionalTupleElementsAndUndefined.js]
"use strict";
// Repro from #50753
// Types in the following declarations should be identical
var v;
var v;
var v;
var v;
var v;
var v;
var v;
var v;
