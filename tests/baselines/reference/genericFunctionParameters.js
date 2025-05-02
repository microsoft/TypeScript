//// [tests/cases/conformance/types/typeRelationships/typeInference/genericFunctionParameters.ts] ////

//// [genericFunctionParameters.ts]
declare function f1<T>(cb: <S>(x: S) => T): T;
declare function f2<T>(cb: <S extends number>(x: S) => T): T;
declare function f3<T>(cb: <S extends Array<S>>(x: S) => T): T;

let x1 = f1(x => x);  // {}
let x2 = f2(x => x);  // number
let x3 = f3(x => x);  // Array<any>

// Repro from #19345

declare const s: <R>(go: <S>(ops: { init(): S; }) => R) => R;
const x = s(a => a.init());  // x is any, should have been {}


//// [genericFunctionParameters.js]
"use strict";
var x1 = f1(function (x) { return x; }); // {}
var x2 = f2(function (x) { return x; }); // number
var x3 = f3(function (x) { return x; }); // Array<any>
var x = s(function (a) { return a.init(); }); // x is any, should have been {}


//// [genericFunctionParameters.d.ts]
declare function f1<T>(cb: <S>(x: S) => T): T;
declare function f2<T>(cb: <S extends number>(x: S) => T): T;
declare function f3<T>(cb: <S extends Array<S>>(x: S) => T): T;
declare let x1: unknown;
declare let x2: number;
declare let x3: any[];
declare const s: <R>(go: <S>(ops: {
    init(): S;
}) => R) => R;
declare const x: unknown;
