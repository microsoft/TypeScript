//// [tests/cases/compiler/contextualSignatureInstantiation3.ts] ////

//// [contextualSignatureInstantiation3.ts]
function map<T, U>(items: T[], f: (x: T) => U): U[]{
    return items.map(f);
}

function identity<T>(x: T) {
    return x;
}

function singleton<T>(x: T) {
    return [x];
}

var xs = [1, 2, 3];

// Have compiler check that we get the correct types
var v1: number[];
var v1 = xs.map(identity);      // Error if not number[]
var v1 = map(xs, identity);     // Error if not number[]

var v2: number[][];         
var v2 = xs.map(singleton);     // Error if not number[][]
var v2 = map(xs, singleton);    // Error if not number[][]


//// [contextualSignatureInstantiation3.js]
function map(items, f) {
    return items.map(f);
}
function identity(x) {
    return x;
}
function singleton(x) {
    return [x];
}
var xs = [1, 2, 3];
// Have compiler check that we get the correct types
var v1;
var v1 = xs.map(identity); // Error if not number[]
var v1 = map(xs, identity); // Error if not number[]
var v2;
var v2 = xs.map(singleton); // Error if not number[][]
var v2 = map(xs, singleton); // Error if not number[][]
