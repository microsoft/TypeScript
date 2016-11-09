//// [declarationEmitDestructuringWithOptionalBindingParameters.ts]
function foo([x,y,z]?: [string, number, boolean]) {
}
function foo1( { x, y, z }?: { x: string; y: number; z: boolean }) {
}

//// [declarationEmitDestructuringWithOptionalBindingParameters.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function foo(_a) {
    var _b = __read(_a, 3), x = _b[0], y = _b[1], z = _b[2];
}
function foo1(_a) {
    var x = _a.x, y = _a.y, z = _a.z;
}


//// [declarationEmitDestructuringWithOptionalBindingParameters.d.ts]
declare function foo([x, y, z]?: [string, number, boolean]): void;
declare function foo1({x, y, z}?: {
    x: string;
    y: number;
    z: boolean;
}): void;
