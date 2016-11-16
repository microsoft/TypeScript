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
        var _b = __read(_a, 3), x = _b[0], y = _b[1], z = _b[2];
    }
    return C1;
}());
var C2 = (function () {
    function C2(_a) {
        var _b = __read(_a, 3), x = _b[0], y = _b[1], z = _b[2];
    }
    return C2;
}());
var C3 = (function () {
    function C3(_a) {
        var x = _a.x, y = _a.y, z = _a.z;
    }
    return C3;
}());


//// [declarationEmitDestructuringParameterProperties.d.ts]
declare class C1 {
    x: string, y: string, z: string;
    constructor([x, y, z]: string[]);
}
declare type TupleType1 = [string, number, boolean];
declare class C2 {
    x: string, y: number, z: boolean;
    constructor([x, y, z]: TupleType1);
}
declare type ObjType1 = {
    x: number;
    y: string;
    z: boolean;
};
declare class C3 {
    x: number, y: string, z: boolean;
    constructor({x, y, z}: ObjType1);
}
