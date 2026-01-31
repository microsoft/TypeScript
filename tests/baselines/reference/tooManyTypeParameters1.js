//// [tests/cases/compiler/tooManyTypeParameters1.ts] ////

//// [tooManyTypeParameters1.ts]
function f<T>() { }
f<string, string>();

var x = <T>() => {};
x<number,number>();

class C<T> {}
var c = new C<Date,Date>();

interface I<T> {}
var i: I<number,number>;

//// [tooManyTypeParameters1.js]
function f() { }
f();
var x = () => { };
x();
class C {
}
var c = new C();
var i;
