// @strict: true
// @declaration: true

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
