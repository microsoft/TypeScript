//// [tests/cases/conformance/es6/destructuring/optionalBindingParametersInOverloads2.ts] ////

//// [optionalBindingParametersInOverloads2.ts]
function foo({ x, y, z }?: { x: string; y: number; z: boolean });
function foo(...rest: any[]) {

}

foo({ x: "", y: 0, z: false });

foo({ x: false, y: 0, z: "" });

//// [optionalBindingParametersInOverloads2.js]
function foo(...rest) {
}
foo({ x: "", y: 0, z: false });
foo({ x: false, y: 0, z: "" });
