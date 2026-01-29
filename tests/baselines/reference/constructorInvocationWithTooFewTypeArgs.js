//// [tests/cases/compiler/constructorInvocationWithTooFewTypeArgs.ts] ////

//// [constructorInvocationWithTooFewTypeArgs.ts]
class D<T, U> {

   x: T

   y: U

}
 
var d = new D<number>();


//// [constructorInvocationWithTooFewTypeArgs.js]
class D {
}
var d = new D();
