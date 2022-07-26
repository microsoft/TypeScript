//// [test.ts]
function getFoo() {
  return { foo: { test: 42 } }
}

const { foo } = getFoo()

export type AliasType = typeof foo

const { foo: renamed } = getFoo()

export type AliasType2 = typeof renamed

function getNested() {
  return { a: { b: { c: 'd' } } }
}

const { a: { b: { c } } } = getNested()

export type AliasType3 = typeof c


//// [test.js]
"use strict";
exports.__esModule = true;
function getFoo() {
    return { foo: { test: 42 } };
}
var foo = getFoo().foo;
var renamed = getFoo().foo;
function getNested() {
    return { a: { b: { c: 'd' } } };
}
var c = getNested().a.b.c;


//// [test.d.ts]
declare const foo: {
    test: number;
};
export declare type AliasType = typeof foo;
declare const renamed: {
    test: number;
};
export declare type AliasType2 = typeof renamed;
declare const c: string;
export declare type AliasType3 = typeof c;
export {};
