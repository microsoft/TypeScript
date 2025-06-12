//// [tests/cases/compiler/missingTypeArguments2.ts] ////

//// [missingTypeArguments2.ts]
class A<T> { }

var x: () => A;
(a: A) => { };
var y: A<A>;
(): A => null;

//// [missingTypeArguments2.js]
class A {
}
var x;
(a) => { };
var y;
() => null;
