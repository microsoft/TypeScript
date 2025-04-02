//// [tests/cases/compiler/assignmentCompatibilityForConstrainedTypeParameters.ts] ////

//// [assignmentCompatibilityForConstrainedTypeParameters.ts]
function foo<T extends { bar: string }>() {
  function bar<S extends T>() {
    var x: S;
    var y: T;
       y = x;
    }
}

//// [assignmentCompatibilityForConstrainedTypeParameters.js]
function foo() {
    function bar() {
        var x;
        var y;
        y = x;
    }
}
