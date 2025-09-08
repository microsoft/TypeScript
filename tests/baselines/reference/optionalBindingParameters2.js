//// [tests/cases/conformance/es6/destructuring/optionalBindingParameters2.ts] ////

//// [optionalBindingParameters2.ts]
function foo({ x, y, z }?: { x: string; y: number; z: boolean }) {

}

foo({ x: "", y: 0, z: false });

foo({ x: false, y: 0, z: "" });

//// [optionalBindingParameters2.js]
function foo({ x, y, z }) {
}
foo({ x: "", y: 0, z: false });
foo({ x: false, y: 0, z: "" });
