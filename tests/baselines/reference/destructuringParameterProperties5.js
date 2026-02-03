//// [tests/cases/conformance/es6/destructuring/destructuringParameterProperties5.ts] ////

//// [destructuringParameterProperties5.ts]
type ObjType1 = { x: number; y: string; z: boolean }
type TupleType1 = [ObjType1, number, string]

class C1 {
    constructor(public [{ x1, x2, x3 }, y, z]: TupleType1) {
        var foo: any = x1 || x2 || x3 || y || z;
        var bar: any = this.x1 || this.x2 || this.x3 || this.y || this.z;
    }
}

var a = new C1([{ x1: 10, x2: "", x3: true }, "", false]);
var [a_x1, a_x2, a_x3, a_y, a_z] = [a.x1, a.x2, a.x3, a.y, a.z];

//// [destructuringParameterProperties5.js]
var C1 = /** @class */ (function () {
    function C1(_a) {
        var _b = _a[0], x1 = _b.x1, x2 = _b.x2, x3 = _b.x3, y = _a[1], z = _a[2];
        var foo = x1 || x2 || x3 || y || z;
        var bar = this.x1 || this.x2 || this.x3 || this.y || this.z;
    }
    return C1;
}());
var a = new C1([{ x1: 10, x2: "", x3: true }, "", false]);
var _a = [a.x1, a.x2, a.x3, a.y, a.z], a_x1 = _a[0], a_x2 = _a[1], a_x3 = _a[2], a_y = _a[3], a_z = _a[4];
