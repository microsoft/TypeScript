//// [tests/cases/compiler/excessPropertyChecksWithNestedIntersections.ts] ////

//// [excessPropertyChecksWithNestedIntersections.ts]
// https://github.com/Microsoft/TypeScript/issues/13813

interface A {
    x: string
}

interface B {
    a: A;
}

interface C {
    c: number;
}

type D = B & C;

let a: B = { a: { x: 'hello' } }; // ok
let b: B = { a: { x: 2 } }; // error - types of property x are incompatible
let c: B = { a: { x: 'hello', y: 2 } }; // error - y does not exist in type A

let d: D = { a: { x: 'hello' }, c: 5 }; // ok
let e: D = { a: { x: 2 }, c: 5 }; // error - types of property x are incompatible
let f: D = { a: { x: 'hello', y: 2 }, c: 5 }; // error - y does not exist in type A

// https://github.com/Microsoft/TypeScript/issues/18075

export type MyType = { id: number; } & { name: string; } & { photo: { id: number; } & { url: string; } }

export let obj: MyType;

export const photo: typeof obj.photo = {
    id: 1,
    url: '',
    xyz: 1 // Great! This causes an error!
};

export const myInstance: MyType = {
    id: 1,
    name: '',
    photo: {
        id: 1,
        url: '',
        xyz: 2 // This should also be an error
    }
};

// https://github.com/Microsoft/TypeScript/issues/28616

export type View<T> = { [K in keyof T]: T[K] extends object ? boolean | View<T[K]> : boolean };

interface TypeC {
    foo: string;
    bar: string;
}

interface TypeB {
    foo: string,
    bar: TypeC
}

interface TypeA {
    foo: string,
    bar: TypeB,
}

let test: View<TypeA>;

test = { foo: true, bar: true, boo: true }

test = { foo: true, bar: { foo: true, bar: true, boo: true } }


//// [excessPropertyChecksWithNestedIntersections.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/13813
Object.defineProperty(exports, "__esModule", { value: true });
exports.myInstance = exports.photo = exports.obj = void 0;
var a = { a: { x: 'hello' } }; // ok
var b = { a: { x: 2 } }; // error - types of property x are incompatible
var c = { a: { x: 'hello', y: 2 } }; // error - y does not exist in type A
var d = { a: { x: 'hello' }, c: 5 }; // ok
var e = { a: { x: 2 }, c: 5 }; // error - types of property x are incompatible
var f = { a: { x: 'hello', y: 2 }, c: 5 }; // error - y does not exist in type A
exports.photo = {
    id: 1,
    url: '',
    xyz: 1 // Great! This causes an error!
};
exports.myInstance = {
    id: 1,
    name: '',
    photo: {
        id: 1,
        url: '',
        xyz: 2 // This should also be an error
    }
};
var test;
test = { foo: true, bar: true, boo: true };
test = { foo: true, bar: { foo: true, bar: true, boo: true } };
