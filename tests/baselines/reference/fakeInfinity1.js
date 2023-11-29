//// [tests/cases/compiler/fakeInfinity1.ts] ////

//// [fakeInfinity1.ts]
// These are not actually the real infinity.
export type PositiveInfinity = 1e999;
export type NegativeInfinity = -1e999;

export type TypeOfInfinity = typeof Infinity;
export type TypeOfNaN = typeof NaN;

type A = 1e999;
type B = 1e9999;

declare let a: A;
declare let b: B;

a = b;
b = a;

a = Infinity;
a = 1e999;
a = 1e9999;

export type Oops = 123456789123456789123456789123456789123456789123456789;
export const oops = 123456789123456789123456789123456789123456789123456789;


//// [fakeInfinity1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oops = void 0;
a = b;
b = a;
a = Infinity;
a = 1e999;
a = 1e9999;
exports.oops = 123456789123456789123456789123456789123456789123456789;


//// [fakeInfinity1.d.ts]
export type PositiveInfinity = 1e999;
export type NegativeInfinity = -1e999;
export type TypeOfInfinity = typeof Infinity;
export type TypeOfNaN = typeof NaN;
export type Oops = 123456789123456789123456789123456789123456789123456789;
export declare const oops = 1.2345678912345678e+53;
