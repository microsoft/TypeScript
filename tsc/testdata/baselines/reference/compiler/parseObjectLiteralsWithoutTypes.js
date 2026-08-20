//// [tests/cases/compiler/parseObjectLiteralsWithoutTypes.ts] ////

//// [parseObjectLiteralsWithoutTypes.ts]
let x: { foo, bar }
let y: { foo: number, bar }
let z: { foo, bar: number }


//// [parseObjectLiteralsWithoutTypes.js]
"use strict";
let x;
let y;
let z;
