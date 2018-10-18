//// [optionalBindingParameters2.ts]
function foo({ x, y, z }?: { x: string; y: number; z: boolean }) {

}

foo({ x: "", y: 0, z: false });

foo({ x: false, y: 0, z: "" });

//// [optionalBindingParameters2.js]
function foo(_a) {
    var x = _a.x, y = _a.y, z = _a.z;
}
foo({ x: "", y: 0, z: false });
foo({ x: false, y: 0, z: "" });
