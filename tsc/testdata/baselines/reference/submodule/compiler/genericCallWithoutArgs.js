//// [tests/cases/compiler/genericCallWithoutArgs.ts] ////

//// [genericCallWithoutArgs.ts]
function f<X, Y>(x: X, y: Y) {
}

f<number,string>.

//// [genericCallWithoutArgs.js]
function f(x, y) {
}
f.;
