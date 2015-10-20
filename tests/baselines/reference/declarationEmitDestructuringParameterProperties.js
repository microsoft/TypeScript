//// [declarationEmitDestructuringParameterProperties.ts]
class C1 {
    constructor(public [x, y, z]: string[]) {
    }
}

type TupleType1 =[string, number, boolean];
class C2 {
    constructor(public [x, y, z]: TupleType1) {
    }
}

type ObjType1 = { x: number; y: string; z: boolean }
class C3 {
    constructor(public { x, y, z }: ObjType1) {
    }
}

//// [declarationEmitDestructuringParameterProperties.js]
var C1 = (function () {
    function C1(_a) {
        var x = _a[0], y = _a[1], z = _a[2];
        this.[x, y, z] = [x, y, z];
    }
    return C1;
})();
var C2 = (function () {
    function C2(_a) {
        var x = _a[0], y = _a[1], z = _a[2];
        this.[x, y, z] = [x, y, z];
    }
    return C2;
})();
var C3 = (function () {
    function C3(_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        this.{ x, y, z } = { x, y, z };
    }
    return C3;
})();
