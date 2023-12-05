//// [tests/cases/compiler/incrementOnNullAssertion.ts] ////

//// [incrementOnNullAssertion.ts]
interface Dictionary<T> {
    [myFavouriteType: string]: T | undefined
}
const x = 'bar'
let foo: Dictionary<number> = {}
if (foo[x] === undefined) {
    foo[x] = 1
}
else {
    let nu = foo[x]
    let n = foo[x]
    foo[x]!++
}


//// [incrementOnNullAssertion.js]
"use strict";
var x = 'bar';
var foo = {};
if (foo[x] === undefined) {
    foo[x] = 1;
}
else {
    var nu = foo[x];
    var n = foo[x];
    foo[x]++;
}
