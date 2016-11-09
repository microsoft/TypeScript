//// [declarationEmitDestructuring3.ts]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }



//// [declarationEmitDestructuring3.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function bar(_a) {
    var _b = __read(_a), x = _b[0], z = _b[1], w = _b.slice(2);
}
function foo(_a) {
    var _b = __read(_a === void 0 ? [1, "string", true] : _a), x = _b[0], y = _b.slice(1);
}


//// [declarationEmitDestructuring3.d.ts]
declare function bar([x, z, ...w]: any[]): void;
declare function foo([x, ...y]?: (string | number | boolean)[]): void;
