//// [tests/cases/conformance/types/spread/spreadUnion3.ts] ////

//// [spreadUnion3.ts]
function f(x: { y: string } | undefined): { y: string } {
    return { y: 123, ...x } // y: string | number
}
f(undefined)


function g(t?: { a: number } | null): void {
    let b = { ...t };
    let c: number = b.a;  // might not have 'a'
}
g()
g(undefined)
g(null)

// spreading nothing but null and undefined is not allowed
declare const nullAndUndefinedUnion: null | undefined;
var x = { ...nullAndUndefinedUnion, ...nullAndUndefinedUnion };
var y = { ...nullAndUndefinedUnion };


//// [spreadUnion3.js]
function f(x) {
    return Object.assign({ y: 123 }, x); // y: string | number
}
f(undefined);
function g(t) {
    let b = Object.assign({}, t);
    let c = b.a; // might not have 'a'
}
g();
g(undefined);
g(null);
var x = Object.assign(Object.assign({}, nullAndUndefinedUnion), nullAndUndefinedUnion);
var y = Object.assign({}, nullAndUndefinedUnion);
