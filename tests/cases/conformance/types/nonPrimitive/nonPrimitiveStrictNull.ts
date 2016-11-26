// @strictNullChecks: true

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
} else {
    d; // undefined
}

if (d == null) {
    d; // null | undefined
} else {
    d.toString(); // object
}

if (d === null) {
    d; // null
} else {
    d.toString(); // error, object | undefined
}

if (typeof d === 'undefined') {
    d; // undefined
} else {
    d.toString(); // error, object | null
}
