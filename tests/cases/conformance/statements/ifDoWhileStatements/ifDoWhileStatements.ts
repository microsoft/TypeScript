// @allowUnreachableCode: true

interface I {
    id: number;
}

class C implements I {
    id: number;
    name: string;
}

class C2 extends C {
    valid: boolean;
}

class D<T>{
    source: T;
    recurse: D<T>;
    wrapped: D<D<T>>
}

function F(x: string): number { return 42; }
function F2(x: number): boolean { return x < 42; }

module M {
    export class A {
        name: string;
    }

    export function F2(x: number): string { return x.toString(); }
}

module N {
    export class A {
        id: number;
    }

    export function F2(x: number): string { return x.toString(); }
}

// literals
if (true) { }
while (true) { }
do { }while(true)

if (null) { }
while (null) { }
do { }while(null)

if (undefined) { }
while (undefined) { }
do { }while(undefined)

if (0.0) { }
while (0.0) { }
do { }while(0.0)

if ('a string') { }
while ('a string') { }
do { }while('a string')

if ('') { }
while ('') { }
do { }while('')

if (/[a-z]/) { }
while (/[a-z]/) { }
do { }while(/[a-z]/)

if ([]) { }
while ([]) { }
do { }while([])

if ([1, 2]) { }
while ([1, 2]) { }
do { }while([1, 2])

if ({}) { }
while ({}) { }
do { }while({})

if ({ x: 1, y: 'a' }) { }
while ({ x: 1, y: 'a' }) { }
do { }while({ x: 1, y: 'a' })

if (() => 43) { }
while (() => 43) { }
do { }while(() => 43)

if (new C()) { }
while (new C()) { }
do { }while(new C())

if (new D<C>()) { }
while (new D<C>()) { }
do { }while(new D<C>())

// references
var a = true;
if (a) { }
while (a) { }
do { }while(a)

var b = null;
if (b) { }
while (b) { }
do { }while(b)

var c = undefined;
if (c) { }
while (c) { }
do { }while(c)

var d = 0.0;
if (d) { }
while (d) { }
do { }while(d)

var e = 'a string';
if (e) { }
while (e) { }
do { }while(e)

var f = '';
if (f) { }
while (f) { }
do { }while(f)

var g = /[a-z]/
if (g) { }
while (g) { }
do { }while(g)

var h = [];
if (h) { }
while (h) { }
do { }while(h)

var i = [1, 2];
if (i) { }
while (i) { }
do { }while(i)

var j = {};
if (j) { }
while (j) { }
do { }while(j)

var k = { x: 1, y: 'a' };
if (k) { }
while (k) { }
do { }while(k)

function fn(x?: string): I { return null; }
if (fn()) { }
while (fn()) { }
do { }while(fn())

if (fn) { }
while (fn) { }
do { }while(fn)


