//// [tests/cases/compiler/noImplicitAnyWithOverloads.ts] ////

//// [noImplicitAnyWithOverloads.ts]
interface A {
    foo;
}
interface B { }

function callb(lam: (l: A) => void);
function callb(lam: (n: B) => void);
function callb(a) { }
callb((a) => { a.foo; }); // error, chose first overload

//// [noImplicitAnyWithOverloads.js]
function callb(a) { }
callb(function (a) { a.foo; }); // error, chose first overload
