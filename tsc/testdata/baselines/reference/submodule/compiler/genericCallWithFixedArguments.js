//// [tests/cases/compiler/genericCallWithFixedArguments.ts] ////

//// [genericCallWithFixedArguments.ts]
class A { foo() { } }
class B { bar() { }} 

function g<T, U>(x) { }
g<A, B>(7) // the parameter list is fixed, so this should not error
 


//// [genericCallWithFixedArguments.js]
class A {
    foo() { }
}
class B {
    bar() { }
}
function g(x) { }
g(7);
