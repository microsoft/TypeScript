//// [tests/cases/conformance/types/nonPrimitive/nonPrimitiveStrictNull.ts] ////

//// [nonPrimitiveStrictNull.ts]
var a: object
declare var b: object | null
declare var c: object | undefined
declare var d: object | null | undefined
var e: object | null
a.toString; // error
a = undefined; // error
a = null; // error
a = b; // error
a = c; // error
a = d; // error

e = a; // ok
a = e; // ok

if (typeof b !== 'object') {
    b.toString(); // error, never
}

if (typeof b === 'object') {
    a = b; // error, b is not narrowed
}

if (typeof d === 'object') {
    b = d; // ok
    d.toString(); // error, object | null
} else {
    d.toString(); // error, undefined
}

if (d == null) {
    d.toString(); // error, undefined | null
} else {
    d.toString(); // object
}

if (d === null) {
    d.toString(); // error, null
} else {
    d.toString(); // error, object | undefined
}

if (typeof d === 'undefined') {
    d.toString(); // error, undefined
} else {
    d.toString(); // error, object | null
}

interface Proxy<T extends object> {}

var x: Proxy<number>; // error
var y: Proxy<null>; // error
var z: Proxy<undefined>; // error

interface Blah {
  foo: number;
}

var u: Proxy<Blah>; // ok


//// [nonPrimitiveStrictNull.js]
var a;
var e;
a.toString; // error
a = undefined; // error
a = null; // error
a = b; // error
a = c; // error
a = d; // error
e = a; // ok
a = e; // ok
if (typeof b !== 'object') {
    b.toString(); // error, never
}
if (typeof b === 'object') {
    a = b; // error, b is not narrowed
}
if (typeof d === 'object') {
    b = d; // ok
    d.toString(); // error, object | null
}
else {
    d.toString(); // error, undefined
}
if (d == null) {
    d.toString(); // error, undefined | null
}
else {
    d.toString(); // object
}
if (d === null) {
    d.toString(); // error, null
}
else {
    d.toString(); // error, object | undefined
}
if (typeof d === 'undefined') {
    d.toString(); // error, undefined
}
else {
    d.toString(); // error, object | null
}
var x; // error
var y; // error
var z; // error
var u; // ok
