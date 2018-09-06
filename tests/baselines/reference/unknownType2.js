//// [unknownType2.ts]
type isUnknown<T> = unknown extends T ? true : false;
type isTrue<T extends true> = T;

type SomeResponse = 'yes' | 'no' | 'idk';
let validate: (x: unknown) => SomeResponse = x => (x === 'yes' || x === 'no') ? x : 'idk'; // No error

const u: unknown = undefined;

declare const symb: unique symbol;

if (u === 5) {
    const y = u.toString(10);
}

if (u === true || u === false) {    
    const someBool: boolean = u;
}

if (u === undefined) {
    const undef: undefined = u;
}

if (u === null) {
    const someNull: null = u;
}

if(u === symb) {
    const symbolAlias: typeof symb = u;
}

if (!(u === 42)) {
    u // u should still be `unknown` here
}

if (u !== 42) {
    type A = isTrue<isUnknown<typeof u>>
}

if (u == 42) {
    type B = isTrue<isUnknown<typeof u>>
}

if (u == true) {
    type C = isTrue<isUnknown<typeof u>>
}

if (u == Object) {
    type D = isTrue<isUnknown<typeof u>>
}


//// [unknownType2.js]
"use strict";
var validate = function (x) { return (x === 'yes' || x === 'no') ? x : 'idk'; }; // No error
var u = undefined;
if (u === 5) {
    var y = u.toString(10);
}
if (u === true || u === false) {
    var someBool = u;
}
if (u === undefined) {
    var undef = u;
}
if (u === null) {
    var someNull = u;
}
if (u === symb) {
    var symbolAlias = u;
}
if (!(u === 42)) {
    u; // u should still be `unknown` here
}
if (u !== 42) {
}
if (u == 42) {
}
if (u == true) {
}
if (u == Object) {
}
