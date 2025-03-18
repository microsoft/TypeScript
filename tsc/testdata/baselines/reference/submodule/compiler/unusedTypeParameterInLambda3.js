//// [tests/cases/compiler/unusedTypeParameterInLambda3.ts] ////

//// [unusedTypeParameterInLambda3.ts]
class A<T> {
    public x: T;
}

var y: new <T,U>(a:T)=>void;


//// [unusedTypeParameterInLambda3.js]
class A {
    x;
}
var y;
