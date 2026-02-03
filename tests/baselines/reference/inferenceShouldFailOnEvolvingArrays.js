//// [tests/cases/compiler/inferenceShouldFailOnEvolvingArrays.ts] ////

//// [inferenceShouldFailOnEvolvingArrays.ts]
// repro from https://github.com/Microsoft/TypeScript/issues/25675
// The type of `arg` blocks inference but simplifies to T.
function logLength<T extends string, U extends string>(arg: { [K in U]: T }[U]): T {
    console.log(arg.length);
    return arg;
}
logLength(42);  // error
let z;
z = logLength(42);  // no error; T is inferred as `any`

function logFirstLength<T extends string[], U extends string>(arg: { [K in U]: T }[U]): T {
    console.log(arg[0].length);
    return arg;
}
logFirstLength([42]);  // error
let zz = [];
zz.push(logLength(42));  // no error; T is inferred as `any`
zz = logFirstLength([42]);  // no error; T is inferred as `any[]`

//// [inferenceShouldFailOnEvolvingArrays.js]
"use strict";
// repro from https://github.com/Microsoft/TypeScript/issues/25675
// The type of `arg` blocks inference but simplifies to T.
function logLength(arg) {
    console.log(arg.length);
    return arg;
}
logLength(42); // error
var z;
z = logLength(42); // no error; T is inferred as `any`
function logFirstLength(arg) {
    console.log(arg[0].length);
    return arg;
}
logFirstLength([42]); // error
var zz = [];
zz.push(logLength(42)); // no error; T is inferred as `any`
zz = logFirstLength([42]); // no error; T is inferred as `any[]`
