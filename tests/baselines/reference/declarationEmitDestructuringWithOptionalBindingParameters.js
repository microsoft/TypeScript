//// [declarationEmitDestructuringWithOptionalBindingParameters.ts]
function foo([x,y,z]?: [string, number, boolean]) {
}
function foo1( { x, y, z }?: { x: string; y: number; z: boolean }) {
}

//// [declarationEmitDestructuringWithOptionalBindingParameters.js]
function foo(_a) {
    var x = _a[0], y = _a[1], z = _a[2];
}
function foo1(_a) {
    var x = _a.x, y = _a.y, z = _a.z;
}


//// [declarationEmitDestructuringWithOptionalBindingParameters.d.ts]
declare function foo([x, y, z]?: [string, number, boolean]): void;
declare function foo1({ x, y, z }?: {
    x: string;
    y: number;
    z: boolean;
}): void;
