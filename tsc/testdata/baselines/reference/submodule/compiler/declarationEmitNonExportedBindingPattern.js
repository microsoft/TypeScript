//// [tests/cases/compiler/declarationEmitNonExportedBindingPattern.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
function getFoo() {
    return { foo: { test: 42 } };
}
const { foo } = getFoo();
const { foo: renamed } = getFoo();
function getNested() {
    return { a: { b: { c: 'd' } } };
}
const { a: { b: { c } } } = getNested();


//// [test.d.ts]
export type AliasType = typeof foo;
export type AliasType2 = typeof renamed;
export type AliasType3 = typeof c;


//// [DtsFileErrors]


test.d.ts(1,32): error TS2304: Cannot find name 'foo'.
test.d.ts(2,33): error TS2304: Cannot find name 'renamed'.
test.d.ts(3,33): error TS2304: Cannot find name 'c'.


==== test.d.ts (3 errors) ====
    export type AliasType = typeof foo;
                                   ~~~
!!! error TS2304: Cannot find name 'foo'.
    export type AliasType2 = typeof renamed;
                                    ~~~~~~~
!!! error TS2304: Cannot find name 'renamed'.
    export type AliasType3 = typeof c;
                                    ~
!!! error TS2304: Cannot find name 'c'.
    