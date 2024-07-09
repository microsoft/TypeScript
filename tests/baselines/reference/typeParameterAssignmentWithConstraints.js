//// [tests/cases/compiler/typeParameterAssignmentWithConstraints.ts] ////

//// [typeParameterAssignmentWithConstraints.ts]
function f<A, B extends A>() {
    var a: A;
    var b: B;
    a = b; // Error: Can't convert B to A
}

//// [typeParameterAssignmentWithConstraints.js]
function f() {
    var a;
    var b;
    a = b; // Error: Can't convert B to A
}
