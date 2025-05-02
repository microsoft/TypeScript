//// [tests/cases/compiler/parseObjectLiteralsWithoutTypes.ts] ////

//// [parseObjectLiteralsWithoutTypes.ts]
let x: { foo, bar }
let y: { foo: number, bar }
let z: { foo, bar: number }


//// [parseObjectLiteralsWithoutTypes.js]
var x;
var y;
var z;
