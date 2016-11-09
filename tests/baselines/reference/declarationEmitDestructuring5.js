//// [declarationEmitDestructuring5.ts]
function baz([, z, , ]) { }
function foo([, b, ]: [any, any]): void { }
function bar([z, , , ]) { }
function bar1([z, , , ] = [1, 3, 4, 6, 7]) { }
function bar2([,,z, , , ]) { }

//// [declarationEmitDestructuring5.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function baz(_a) {
    var _b = __read(_a, 3), z = _b[1];
}
function foo(_a) {
    var _b = __read(_a, 2), b = _b[1];
}
function bar(_a) {
    var _b = __read(_a, 3), z = _b[0];
}
function bar1(_a) {
    var _b = __read(_a === void 0 ? [1, 3, 4, 6, 7] : _a, 3), z = _b[0];
}
function bar2(_a) {
    var _b = __read(_a, 5), z = _b[2];
}


//// [declarationEmitDestructuring5.d.ts]
declare function baz([ , z,  , ]: [any, any, any]): void;
declare function foo([ , b, ]: [any, any]): void;
declare function bar([z,  ,  , ]: [any, any, any]): void;
declare function bar1([z,  ,  , ]?: [number, number, number, number, number]): void;
declare function bar2([ ,  , z,  ,  , ]: [any, any, any, any, any]): void;
