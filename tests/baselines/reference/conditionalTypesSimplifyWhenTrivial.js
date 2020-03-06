//// [conditionalTypesSimplifyWhenTrivial.ts]
const fn1 = <Params>(
    params: Pick<Params, Exclude<keyof Params, never>>,
): Params => params;

function fn2<T>(x: Exclude<T, never>) {
    var y: T = x;
    x = y;
}

const fn3 = <Params>(
    params: Pick<Params, Extract<keyof Params, keyof Params>>,
): Params => params;

function fn4<T>(x: Extract<T, T>) {
    var y: T = x;
    x = y;
}

declare var x: Extract<number | string, any>; // Should be `numebr | string` and not `any`

type ExtractWithDefault<T, U, D = never> = T extends U ? T : D;

type ExcludeWithDefault<T, U, D = never> = T extends U ? D : T;

const fn5 = <Params>(
    params: Pick<Params, ExcludeWithDefault<keyof Params, never>>,
): Params => params;

function fn6<T>(x: ExcludeWithDefault<T, never>) {
    var y: T = x;
    x = y;
}

const fn7 = <Params>(
    params: Pick<Params, ExtractWithDefault<keyof Params, keyof Params>>,
): Params => params;

function fn8<T>(x: ExtractWithDefault<T, T>) {
    var y: T = x;
    x = y;
}

type TemplatedConditional<TCheck, TExtends, TTrue, TFalse> = TCheck extends TExtends ? TTrue : TFalse;

const fn9 = <Params>(
    params: Pick<Params, TemplatedConditional<keyof Params, never, never, keyof Params>>,
): Params => params;

function fn10<T>(x: TemplatedConditional<T, never, never, T>) {
    var y: T = x;
    x = y;
}

const fn11 = <Params>(
    params: Pick<Params, TemplatedConditional<keyof Params, keyof Params, keyof Params, never>>,
): Params => params;

function fn12<T>(x: TemplatedConditional<T, T, T, never>) {
    var y: T = x;
    x = y;
}

declare var z: any;
const zee = z!!!; // since x is `any`, `x extends null | undefined` should be both true and false - and thus yield `any` 


//// [conditionalTypesSimplifyWhenTrivial.js]
"use strict";
var fn1 = function (params) { return params; };
function fn2(x) {
    var y = x;
    x = y;
}
var fn3 = function (params) { return params; };
function fn4(x) {
    var y = x;
    x = y;
}
var fn5 = function (params) { return params; };
function fn6(x) {
    var y = x;
    x = y;
}
var fn7 = function (params) { return params; };
function fn8(x) {
    var y = x;
    x = y;
}
var fn9 = function (params) { return params; };
function fn10(x) {
    var y = x;
    x = y;
}
var fn11 = function (params) { return params; };
function fn12(x) {
    var y = x;
    x = y;
}
var zee = z; // since x is `any`, `x extends null | undefined` should be both true and false - and thus yield `any` 
