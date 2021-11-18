//// [discriminatedUnionTypes3.ts]
type A = { type2: "a", a: number }
type B = { type2: "b", b: number }
type C = { type2: "c", b: number | string }

type X = { type1: A, x: string }
type Y = { type1: B, y: string }
type Z = { type1: C, z: string }
type W = { type1: undefined }

function f32(x: X | Y) {
    switch (x.type1.type2) {
        case "a":
            x.x // typeof x is X
            break;
        case "b":
            x.y // typeof x is Y
            break;
    }
}

function f33(x: A | B) {
    switch (x.type2) {
        case "a":
            x // typeof x is X
            break;
        case "b":
            x // typeof x is Y
            break;
    }
}

function f34(x: X | Y) {
    if (x.type1.type2 === "a") {
        x.x // typeof x is X
    } else if (x.type1.type2 === "b") {
        x.y // typeof x is Y
    }
}

function f35(x: X | W) {
    if (x.type1?.type2 === "a") {
        x.x
    }
}

function f36(x: X | W) {
    x.type1?.type2 ?? x;
}

type S = { sub: { type0: X }, s: string }
type T = { sub: { type0: Y }, t: string }

function f37(s: S | T) {
    if (s.sub.type0.type1.type2 === "a") {
        s.s // typeof s is S
        s.sub.type0.x // type of s.sub.type is X
        s.sub.type0.type1.a // type of s.sub.type.type is A
    } else {
        s.s // type error!
    }
}

// Repro from #44435

type Correct = {
	code: string
	property: true
	err: undefined
}
type Err = {
	err: `${string} is wrong!`
}
type SomeReturnType = Correct | Err;

const example: SomeReturnType = {} as SomeReturnType;

if (example.err === undefined) {
	example.property;  // true
}


//// [discriminatedUnionTypes3.js]
"use strict";
function f32(x) {
    switch (x.type1.type2) {
        case "a":
            x.x; // typeof x is X
            break;
        case "b":
            x.y; // typeof x is Y
            break;
    }
}
function f33(x) {
    switch (x.type2) {
        case "a":
            x; // typeof x is X
            break;
        case "b":
            x; // typeof x is Y
            break;
    }
}
function f34(x) {
    if (x.type1.type2 === "a") {
        x.x; // typeof x is X
    }
    else if (x.type1.type2 === "b") {
        x.y; // typeof x is Y
    }
}
function f35(x) {
    var _a;
    if (((_a = x.type1) === null || _a === void 0 ? void 0 : _a.type2) === "a") {
        x.x;
    }
}
function f36(x) {
    var _a, _b;
    (_b = (_a = x.type1) === null || _a === void 0 ? void 0 : _a.type2) !== null && _b !== void 0 ? _b : x;
}
function f37(s) {
    if (s.sub.type0.type1.type2 === "a") {
        s.s; // typeof s is S
        s.sub.type0.x; // type of s.sub.type is X
        s.sub.type0.type1.a; // type of s.sub.type.type is A
    }
    else {
        s.s; // type error!
    }
}
var example = {};
if (example.err === undefined) {
    example.property; // true
}
