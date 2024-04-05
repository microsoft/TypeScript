//// [tests/cases/compiler/typeGuardNarrowsIndexedAccessOfKnownProperty6.ts] ////

//// [typeGuardNarrowsIndexedAccessOfKnownProperty6.ts]
declare const aIndex: "key";
const a: { key?: { x?: number } } = {};
if (a[aIndex] && a[aIndex].x) {
    a[aIndex].x // number
}

declare const bIndex: "key";
const b: { key: { x?: number } } = { key: {} };
if (b[bIndex].x) {
    b[bIndex].x // number
}

declare const cIndex: 1;
interface Foo {
    x: number | undefined;
}
const c: Foo[] = [];
if (c[cIndex].x) {
    c[cIndex].x // number
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty6.js]
"use strict";
var a = {};
if (a[aIndex] && a[aIndex].x) {
    a[aIndex].x; // number
}
var b = { key: {} };
if (b[bIndex].x) {
    b[bIndex].x; // number
}
var c = [];
if (c[cIndex].x) {
    c[cIndex].x; // number
}
