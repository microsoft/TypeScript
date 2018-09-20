//// [destructuringParameterProperties1.ts]
class C1 {
    constructor(public [x, y, z]: string[]) {
    }
}

type TupleType1 = [string, number, boolean];

class C2 {
    constructor(public [x, y, z]: TupleType1) {
    }
}

type ObjType1 = { x: number; y: string; z: boolean }

class C3 {
    constructor(public { x, y, z }: ObjType1) {
    }
}

var c1 = new C1([]);
c1 = new C1(["larry", "{curly}", "moe"]);
var useC1Properties = c1.x === c1.y && c1.y === c1.z;

var c2 = new C2(["10", 10, !!10]);
var [c2_x, c2_y, c2_z] = [c2.x, c2.y, c2.z];

var c3 = new C3({x: 0, y: "", z: false});
c3 = new C3({x: 0, "y": "y", z: true});
var [c3_x, c3_y, c3_z] = [c3.x, c3.y, c3.z];

//// [destructuringParameterProperties1.js]
var C1 = /** @class */ (function () {
    function C1(_a) {
        var x = _a[0], y = _a[1], z = _a[2];
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2(_a) {
        var x = _a[0], y = _a[1], z = _a[2];
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3(_a) {
        var x = _a.x, y = _a.y, z = _a.z;
    }
    return C3;
}());
var c1 = new C1([]);
c1 = new C1(["larry", "{curly}", "moe"]);
var useC1Properties = c1.x === c1.y && c1.y === c1.z;
var c2 = new C2(["10", 10, !!10]);
var _a = [c2.x, c2.y, c2.z], c2_x = _a[0], c2_y = _a[1], c2_z = _a[2];
var c3 = new C3({ x: 0, y: "", z: false });
c3 = new C3({ x: 0, "y": "y", z: true });
var _b = [c3.x, c3.y, c3.z], c3_x = _b[0], c3_y = _b[1], c3_z = _b[2];
