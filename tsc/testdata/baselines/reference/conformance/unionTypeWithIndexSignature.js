//// [tests/cases/conformance/types/union/unionTypeWithIndexSignature.ts] ////

//// [unionTypeWithIndexSignature.ts]
type Two = { foo: { bar: true }, baz: true } | { [s: string]: string };
declare var u: Two
u.foo = 'bye'
u.baz = 'hi'
type Three = { foo: number } | { [s: string]: string } | { [s: string]: boolean };
declare var v: Three
v.foo = false
type Missing = { foo: number, bar: true } | { [s: string]: string } | { foo: boolean }
declare var m: Missing
m.foo = 'hi'
m.bar
type RO = { foo: number } | { readonly [s: string]: string }
declare var ro: RO
ro.foo = 'not allowed'
type Num = { '0': string } | { [n: number]: number }
declare var num: Num
num[0] = 1
num['0'] = 'ok'
const sym = Symbol()
type Both = { s: number, '0': number, [sym]: boolean } | { [n: number]: number, [s: string]: string | number }
declare var both: Both
both['s'] = 'ok'
both[0] = 1
both[1] = 0 // not ok
both[0] = 'not ok'
both[sym] = 'not ok'


//// [unionTypeWithIndexSignature.js]
"use strict";
u.foo = 'bye';
u.baz = 'hi';
v.foo = false;
m.foo = 'hi';
m.bar;
ro.foo = 'not allowed';
num[0] = 1;
num['0'] = 'ok';
const sym = Symbol();
both['s'] = 'ok';
both[0] = 1;
both[1] = 0; // not ok
both[0] = 'not ok';
both[sym] = 'not ok';
