//// [tests/cases/compiler/genericFunctionTypedArgumentsAreFixed.ts] ////

//// [genericFunctionTypedArgumentsAreFixed.ts]
declare function map<T, U>(f: (x: T) => U, xs: T[]): U[];
map((a) => a.length, [1]);

//// [genericFunctionTypedArgumentsAreFixed.js]
"use strict";
map((a) => a.length, [1]);
