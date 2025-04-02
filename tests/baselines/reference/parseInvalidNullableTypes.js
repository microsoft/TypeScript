//// [tests/cases/compiler/parseInvalidNullableTypes.ts] ////

//// [parseInvalidNullableTypes.ts]
function f1(a: string): a is ?string {
    return true;
}

function f2(a: string?) {}
function f3(a: number?) {}

function f4(a: ?string) {}
function f5(a: ?number) {}

function f6(a: string): ?string {
    return true;
}

const a = 1 as any?;
const b: number? = 1;

const c = 1 as ?any;
const d: ?number = 1;

let e: unknown?;
let f: never?;
let g: void?;
let h: undefined?;


//// [parseInvalidNullableTypes.js]
"use strict";
function f1(a) {
    return true;
}
function f2(a) { }
function f3(a) { }
function f4(a) { }
function f5(a) { }
function f6(a) {
    return true;
}
var a = 1;
var b = 1;
var c = 1;
var d = 1;
var e;
var f;
var g;
var h;
