//// [tests/cases/conformance/es6/destructuring/optionalBindingParameters1.ts] ////

//// [optionalBindingParameters1.ts]
function foo([x,y,z]?: [string, number, boolean]) {

}

foo(["", 0, false]);

foo([false, 0, ""]);

//// [optionalBindingParameters1.js]
function foo([x, y, z]) {
}
foo(["", 0, false]);
foo([false, 0, ""]);
