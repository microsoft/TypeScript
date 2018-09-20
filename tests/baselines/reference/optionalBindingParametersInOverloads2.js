//// [optionalBindingParametersInOverloads2.ts]
function foo({ x, y, z }?: { x: string; y: number; z: boolean });
function foo(...rest: any[]) {

}

foo({ x: "", y: 0, z: false });

foo({ x: false, y: 0, z: "" });

//// [optionalBindingParametersInOverloads2.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
foo({ x: "", y: 0, z: false });
foo({ x: false, y: 0, z: "" });
