class A { foo() { } }
class B { bar() { }} 

function g<T, U>(x) { }
g<A, B>(7) // the parameter list is fixed, so this should not error
 
