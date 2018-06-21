//// [getBaseSignatureShouldNotGetWrapperTypeOfPrimitives.ts]
export declare function f1<T>(cb: <S extends number>(x: S) => T): T;
export declare function f2<T>(cb: <S extends string>(x: S) => T): T;
export declare function f3<T>(cb: <S extends symbol>(x: S) => T): T;
export declare function f4<T>(cb: <S extends number | string | symbol>(x: S) => T): T;
export declare function f5<T, O>(cb: <S extends keyof O>(x: S) => T, obj: O): keyof O;
export declare function f6<T, O>(cb: <S extends string & keyof O>(x: S) => T, obj: O): T;
export declare function f7<T, O>(cb: <S extends Extract<keyof O, string>>(x: S) => T, obj: O): T;

const x1 = f1(x => x); 
const expectedx1: number = x1;

let x2 = f2(x => x);
const expectedx2: string = x2;

let x3 = f3(x => x);
const expectedx3: symbol = x3;

let x4 = f4(x => x);
const expectedx4: number | string | symbol = x4;

declare const symProp: unique symbol
declare const obj: {
    prop: string,
    [symProp]: symbol,
    [index: number]: number
}


let x5 = f5((x) => x, obj);
const expectedx5: number | string | symbol = x5;

let x6 = f6(x => x, obj);
const expectedx6: string = x6;

let x7 = f7(x => x, obj);
const expectedx7: string = x7;

//// [getBaseSignatureShouldNotGetWrapperTypeOfPrimitives.js]
"use strict";
exports.__esModule = true;
var x1 = f1(function (x) { return x; });
var expectedx1 = x1;
var x2 = f2(function (x) { return x; });
var expectedx2 = x2;
var x3 = f3(function (x) { return x; });
var expectedx3 = x3;
var x4 = f4(function (x) { return x; });
var expectedx4 = x4;
var x5 = f5(function (x) { return x; }, obj);
var expectedx5 = x5;
var x6 = f6(function (x) { return x; }, obj);
var expectedx6 = x6;
var x7 = f7(function (x) { return x; }, obj);
var expectedx7 = x7;
