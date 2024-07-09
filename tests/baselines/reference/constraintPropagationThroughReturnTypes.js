//// [tests/cases/compiler/constraintPropagationThroughReturnTypes.ts] ////

//// [constraintPropagationThroughReturnTypes.ts]
function g<T>(x: T): T {
  return x;
}
 
function f<S extends { foo: string }>(x: S) {
  var y = g(x);
  y;
}


//// [constraintPropagationThroughReturnTypes.js]
function g(x) {
    return x;
}
function f(x) {
    var y = g(x);
    y;
}
