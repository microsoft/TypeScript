//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction2.ts] ////

//// [typeSatisfaction2.ts]
export type T1 = () => void;
export type T2 = (a: number, b: number) => number;

export function f1() { } satisfies () => void;
export function f2() { } satisfies () => number;
export function f3() { } satisfies T1;

export function f4(a: number, b: number) {
    return 1;
} satisfies (a: number, b: number) => number;

export function f5(a: number, b: number) {
    return 1;
} satisfies T2;

export function f6(a: boolean, b: boolean) {
    return 1;
} satisfies (a: number, b: number) => number;

export function f7(a: number, b: boolean) {
    return 1;
} satisfies T2;

export function f8(a: number, b: number) {
    return "";
} satisfies (a: number, b: number) => number;

export function f9(a: number, b: number) {
    return "";
} satisfies T2;


//// [typeSatisfaction2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f1 = f1;
exports.f2 = f2;
exports.f3 = f3;
exports.f4 = f4;
exports.f5 = f5;
exports.f6 = f6;
exports.f7 = f7;
exports.f8 = f8;
exports.f9 = f9;
function f1() { }
;
function f2() { }
;
function f3() { }
;
function f4(a, b) {
    return 1;
}
;
function f5(a, b) {
    return 1;
}
;
function f6(a, b) {
    return 1;
}
;
function f7(a, b) {
    return 1;
}
;
function f8(a, b) {
    return "";
}
;
function f9(a, b) {
    return "";
}
;
