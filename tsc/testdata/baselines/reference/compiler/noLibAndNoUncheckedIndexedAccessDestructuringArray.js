//// [tests/cases/compiler/noLibAndNoUncheckedIndexedAccessDestructuringArray.ts] ////

//// [globals.ts]
interface Array<T> {}
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number {}
interface Object {}
interface RegExp {}
interface String {}

//// [input.ts]
declare var x: string[];
var [a] = x;


//// [globals.js]
"use strict";
//// [input.js]
"use strict";
var [a] = x;
