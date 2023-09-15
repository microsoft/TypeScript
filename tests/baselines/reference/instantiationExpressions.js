//// [tests/cases/conformance/types/typeParameters/typeArgumentLists/instantiationExpressions.ts] ////

//// [instantiationExpressions.ts]
declare function fx<T>(x: T): T;
declare function fx<T>(x: T, n: number): T;
declare function fx<T, U>(t: [T, U]): [T, U];

function f1() {
    let f0 = fx<>;  // Error
    let f1 = fx<string>;  // { (x: string): string; (x: string, n: number): string; }
    let f2 = fx<string, number>;  // (t: [string, number]) => [string, number]
    let f3 = fx<string, number, boolean>;  // Error
}

type T10 = typeof fx<>;  // Error
type T11 = typeof fx<string>;  // { (x: string): string; (x: string, n: number): string; }
type T12 = typeof fx<string, number>;  // (t: [string, number]) => [string, number]
type T13 = typeof fx<string, number, boolean>;  // Error

function f2() {
    const A0 = Array<>;  // Error
    const A1 = Array<string>;  // new (...) => string[]
    const A2 = Array<string, number>;  // Error
}

type T20 = typeof Array<>;  // Error
type T21 = typeof Array<string>;  // new (...) => string[]
type T22 = typeof Array<string, number>;  // Error

declare class C<T> {
    constructor(x: T);
    static f<U>(x: U): U[];
}

function f3() {
    let c1 = C<string>;  // { new (x: string): C<string>; f<U>(x: U): T[]; prototype: C<any>; }
    let f1 = C.f<string>;  // (x: string) => string[]
}

function f10(f: { <T>(a: T): T, <U>(a: U, b: number): U[] }) {
    let fs = f<string>;  // { (a: string): string; (a: string, b: number): string[]; }
}

function f11(f: { <T>(a: T): T, (a: string, b: number): string[] }) {
    let fs = f<string>;  // (a: string) => string
}

function f12(f: { <T>(a: T): T, x: string }) {
    let fs = f<string>;  // { (a: string): string; x: string; }
}

function f13(f: { x: string, y: string }) {
    let fs = f<string>;  // Error, no applicable signatures
}

function f14(f: { new <T>(a: T): T, new <U>(a: U, b: number): U[] }) {
    let fs = f<string>;  // { new (a: string): string; new (a: string, b: number): string[]; }
}

function f15(f: { new <T>(a: T): T, <U>(a: U, b: number): U[] }) {
    let fs = f<string>;  // { new (a: string): string; (a: string, b: number): string[]; }
}

function f16(f: { new <T>(a: T): T, (a: string, b: number): string[] }) {
    let fs = f<string>;  // new (a: string) => string
}

function f17(f: { <T>(a: T): T, new (a: string, b: number): string[] }) {
    let fs = f<string>;  // (a: string) => string
}

function f20(f: (<T>(a: T) => T) & (<U>(a: U, b: number) => U[])) {
    let fs = f<string>;  // ((a: string) => string) & ((a: string, b: number) => string[]])
}

function f21(f: (<T>(a: T) => T) & ((a: string, b: number) => string[])) {
    let fs = f<string>;  // (a: string) => string
}

function f22(f: (<T>(a: T) => T) & { x: string }) {
    let fs = f<string>;  // ((a: string) => string) & { x: string }
}

function f23(f: { x: string } & { y: string }) {
    let fs = f<string>;  // Error, no applicable signatures
}

function f24(f: (new <T>(a: T) => T) & (new <U>(a: U, b: number) => U[])) {
    let fs = f<string>;  // (new (a: string) => string) & ((a: string, b: number) => string[]])
}

function f25(f: (new <T>(a: T) => T) & (<U>(a: U, b: number) => U[])) {
    let fs = f<string>;  // (new (a: string) => string) & ((a: string, b: number) => string[]])
}

function f26(f: (new <T>(a: T) => T) & ((a: string, b: number) => string[])) {
    let fs = f<string>;  // new (a: string) => string
}

function f27(f: (<T>(a: T) => T) & (new (a: string, b: number) => string[])) {
    let fs = f<string>;  // (a: string) => string
}

function f30(f: (<T>(a: T) => T) | (<U>(a: U, b: number) => U[])) {
    let fs = f<string>;  // ((a: string) => string) | ((a: string, b: number) => string[]])
}

function f31(f: (<T>(a: T) => T) | ((a: string, b: number) => string[])) {
    let fs = f<string>;  // Error, '(a: string, b: number) => string[]' has no applicable signatures
}

function f32(f: (<T>(a: T) => T) | { x: string }) {
    let fs = f<string>;  // ((a: string) => string) | { x: string }
}

function f33(f: { x: string } | { y: string }) {
    let fs = f<string>;  // Error, no applicable signatures
}

function f34(f: (new <T>(a: T) => T) | (new <U>(a: U, b: number) => U[])) {
    let fs = f<string>;  // (new (a: string) => string) | ((a: string, b: number) => string[]])
}

function f35(f: (new <T>(a: T) => T) | (<U>(a: U, b: number) => U[])) {
    let fs = f<string>;  // (new (a: string) => string) | ((a: string, b: number) => string[]])
}

function f36(f: (new <T>(a: T) => T) | ((a: string, b: number) => string[])) {
    let fs = f<string>;  // Error, '(a: string, b: number) => string[]' has no applicable signatures
}

function f37(f: (<T>(a: T) => T) | (new (a: string, b: number) => string[])) {
    let fs = f<string>;  // Error, 'new (a: string, b: number) => string[]' has no applicable signatures
}

function f38<T extends (<A>(x: A) => A) | (<B>(x: B) => B[]), U>(f: T | U | (<C>(x: C) => C[][])) {
    let fs = f<string>;  // U | ((x: string) => string) | ((x: string) => string[]) | ((x: string) => string[][])
}

function makeBox<T>(value: T) {
    return { value };
}

type BoxFunc<T> = typeof makeBox<T>;  // (value: T) => { value: T }
type StringBoxFunc = BoxFunc<string>;  // (value: string) => { value: string }

type Box<T> = ReturnType<typeof makeBox<T>>;  // { value: T }
type StringBox = Box<string>;  // { value: string }

type A<U> = InstanceType<typeof Array<U>>;  // U[]

declare const g1: {
    <T>(a: T): { a: T };
    new <U>(b: U): { b: U };
}

type T30<V> = typeof g1<V>;  // { (a: V) => { a: V }; new (b: V) => { b: V }; }
type T31<A> = ReturnType<T30<A>>;  // { a: A }
type T32<B> = InstanceType<T30<B>>;  // { b: B }

declare const g2: {
    <T extends string>(a: T): T;
    new <T extends number>(b: T): T;
}

type T40<U extends string> = typeof g2<U>;  // Error
type T41<U extends number> = typeof g2<U>;  // Error

declare const g3: {
    <T extends string>(a: T): T;
    new <T extends number, Q>(b: T): T;
}

type T50<U extends string> = typeof g3<U>;  // (a: U) => U
type T51<U extends number> = typeof g3<U, any>;  // (b: U) => U


//// [instantiationExpressions.js]
"use strict";
function f1() {
    var f0 = fx; // Error
    var f1 = (fx); // { (x: string): string; (x: string, n: number): string; }
    var f2 = (fx); // (t: [string, number]) => [string, number]
    var f3 = (fx); // Error
}
function f2() {
    var A0 = Array; // Error
    var A1 = (Array); // new (...) => string[]
    var A2 = (Array); // Error
}
function f3() {
    var c1 = (C); // { new (x: string): C<string>; f<U>(x: U): T[]; prototype: C<any>; }
    var f1 = (C.f); // (x: string) => string[]
}
function f10(f) {
    var fs = (f); // { (a: string): string; (a: string, b: number): string[]; }
}
function f11(f) {
    var fs = (f); // (a: string) => string
}
function f12(f) {
    var fs = (f); // { (a: string): string; x: string; }
}
function f13(f) {
    var fs = (f); // Error, no applicable signatures
}
function f14(f) {
    var fs = (f); // { new (a: string): string; new (a: string, b: number): string[]; }
}
function f15(f) {
    var fs = (f); // { new (a: string): string; (a: string, b: number): string[]; }
}
function f16(f) {
    var fs = (f); // new (a: string) => string
}
function f17(f) {
    var fs = (f); // (a: string) => string
}
function f20(f) {
    var fs = (f); // ((a: string) => string) & ((a: string, b: number) => string[]])
}
function f21(f) {
    var fs = (f); // (a: string) => string
}
function f22(f) {
    var fs = (f); // ((a: string) => string) & { x: string }
}
function f23(f) {
    var fs = (f); // Error, no applicable signatures
}
function f24(f) {
    var fs = (f); // (new (a: string) => string) & ((a: string, b: number) => string[]])
}
function f25(f) {
    var fs = (f); // (new (a: string) => string) & ((a: string, b: number) => string[]])
}
function f26(f) {
    var fs = (f); // new (a: string) => string
}
function f27(f) {
    var fs = (f); // (a: string) => string
}
function f30(f) {
    var fs = (f); // ((a: string) => string) | ((a: string, b: number) => string[]])
}
function f31(f) {
    var fs = (f); // Error, '(a: string, b: number) => string[]' has no applicable signatures
}
function f32(f) {
    var fs = (f); // ((a: string) => string) | { x: string }
}
function f33(f) {
    var fs = (f); // Error, no applicable signatures
}
function f34(f) {
    var fs = (f); // (new (a: string) => string) | ((a: string, b: number) => string[]])
}
function f35(f) {
    var fs = (f); // (new (a: string) => string) | ((a: string, b: number) => string[]])
}
function f36(f) {
    var fs = (f); // Error, '(a: string, b: number) => string[]' has no applicable signatures
}
function f37(f) {
    var fs = (f); // Error, 'new (a: string, b: number) => string[]' has no applicable signatures
}
function f38(f) {
    var fs = (f); // U | ((x: string) => string) | ((x: string) => string[]) | ((x: string) => string[][])
}
function makeBox(value) {
    return { value: value };
}


//// [instantiationExpressions.d.ts]
declare function fx<T>(x: T): T;
declare function fx<T>(x: T, n: number): T;
declare function fx<T, U>(t: [T, U]): [T, U];
declare function f1(): void;
type T10 = typeof fx;
type T11 = typeof fx<string>;
type T12 = typeof fx<string, number>;
type T13 = typeof fx<string, number, boolean>;
declare function f2(): void;
type T20 = typeof Array;
type T21 = typeof Array<string>;
type T22 = typeof Array<string, number>;
declare class C<T> {
    constructor(x: T);
    static f<U>(x: U): U[];
}
declare function f3(): void;
declare function f10(f: {
    <T>(a: T): T;
    <U>(a: U, b: number): U[];
}): void;
declare function f11(f: {
    <T>(a: T): T;
    (a: string, b: number): string[];
}): void;
declare function f12(f: {
    <T>(a: T): T;
    x: string;
}): void;
declare function f13(f: {
    x: string;
    y: string;
}): void;
declare function f14(f: {
    new <T>(a: T): T;
    new <U>(a: U, b: number): U[];
}): void;
declare function f15(f: {
    new <T>(a: T): T;
    <U>(a: U, b: number): U[];
}): void;
declare function f16(f: {
    new <T>(a: T): T;
    (a: string, b: number): string[];
}): void;
declare function f17(f: {
    <T>(a: T): T;
    new (a: string, b: number): string[];
}): void;
declare function f20(f: (<T>(a: T) => T) & (<U>(a: U, b: number) => U[])): void;
declare function f21(f: (<T>(a: T) => T) & ((a: string, b: number) => string[])): void;
declare function f22(f: (<T>(a: T) => T) & {
    x: string;
}): void;
declare function f23(f: {
    x: string;
} & {
    y: string;
}): void;
declare function f24(f: (new <T>(a: T) => T) & (new <U>(a: U, b: number) => U[])): void;
declare function f25(f: (new <T>(a: T) => T) & (<U>(a: U, b: number) => U[])): void;
declare function f26(f: (new <T>(a: T) => T) & ((a: string, b: number) => string[])): void;
declare function f27(f: (<T>(a: T) => T) & (new (a: string, b: number) => string[])): void;
declare function f30(f: (<T>(a: T) => T) | (<U>(a: U, b: number) => U[])): void;
declare function f31(f: (<T>(a: T) => T) | ((a: string, b: number) => string[])): void;
declare function f32(f: (<T>(a: T) => T) | {
    x: string;
}): void;
declare function f33(f: {
    x: string;
} | {
    y: string;
}): void;
declare function f34(f: (new <T>(a: T) => T) | (new <U>(a: U, b: number) => U[])): void;
declare function f35(f: (new <T>(a: T) => T) | (<U>(a: U, b: number) => U[])): void;
declare function f36(f: (new <T>(a: T) => T) | ((a: string, b: number) => string[])): void;
declare function f37(f: (<T>(a: T) => T) | (new (a: string, b: number) => string[])): void;
declare function f38<T extends (<A>(x: A) => A) | (<B>(x: B) => B[]), U>(f: T | U | (<C>(x: C) => C[][])): void;
declare function makeBox<T>(value: T): {
    value: T;
};
type BoxFunc<T> = typeof makeBox<T>;
type StringBoxFunc = BoxFunc<string>;
type Box<T> = ReturnType<typeof makeBox<T>>;
type StringBox = Box<string>;
type A<U> = InstanceType<typeof Array<U>>;
declare const g1: {
    <T>(a: T): {
        a: T;
    };
    new <U>(b: U): {
        b: U;
    };
};
type T30<V> = typeof g1<V>;
type T31<A> = ReturnType<T30<A>>;
type T32<B> = InstanceType<T30<B>>;
declare const g2: {
    <T extends string>(a: T): T;
    new <T extends number>(b: T): T;
};
type T40<U extends string> = typeof g2<U>;
type T41<U extends number> = typeof g2<U>;
declare const g3: {
    <T extends string>(a: T): T;
    new <T extends number, Q>(b: T): T;
};
type T50<U extends string> = typeof g3<U>;
type T51<U extends number> = typeof g3<U, any>;
