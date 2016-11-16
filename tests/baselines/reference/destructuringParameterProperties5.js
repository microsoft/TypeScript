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
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var C1 = (function () {
    function C1(_a) {
        var _b = __read(_a, 3), _c = _b[0], x1 = _c.x1, x2 = _c.x2, x3 = _c.x3, y = _b[1], z = _b[2];
        var foo = x1 || x2 || x3 || y || z;
        var bar = this.x1 || this.x2 || this.x3 || this.y || this.z;
    }
    return C1;
}());
var a = new C1([{ x1: 10, x2: "", x3: true }, "", false]);
var _a = [a.x1, a.x2, a.x3, a.y, a.z], a_x1 = _a[0], a_x2 = _a[1], a_x3 = _a[2], a_y = _a[3], a_z = _a[4];
