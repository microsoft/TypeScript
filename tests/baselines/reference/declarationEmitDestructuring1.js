//// [declarationEmitDestructuring1.ts]
function foo([a, b, c]: [string, string, string]): void { }
function far([a, [b], [[c]]]: [number, boolean[], string[][]]): void { }
function bar({a1, b1, c1}: { a1: number, b1: boolean, c1: string }): void { }
function baz({a2, b2: {b1, c1}}: { a2: number, b2: { b1: boolean, c1: string } }): void { } 


//// [declarationEmitDestructuring1.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
function foo(_a) {
    var _b = __read(_a, 3), a = _b[0], b = _b[1], c = _b[2];
}
function far(_a) {
    var _b = __read(_a, 3), a = _b[0], _c = __read(_b[1], 1), b = _c[0], _d = __read(_b[2], 1), _e = __read(_d[0], 1), c = _e[0];
}
function bar(_a) {
    var a1 = _a.a1, b1 = _a.b1, c1 = _a.c1;
}
function baz(_a) {
    var a2 = _a.a2, _b = _a.b2, b1 = _b.b1, c1 = _b.c1;
}


//// [declarationEmitDestructuring1.d.ts]
declare function foo([a, b, c]: [string, string, string]): void;
declare function far([a, [b], [[c]]]: [number, boolean[], string[][]]): void;
declare function bar({a1, b1, c1}: {
    a1: number;
    b1: boolean;
    c1: string;
}): void;
declare function baz({a2, b2: {b1, c1}}: {
    a2: number;
    b2: {
        b1: boolean;
        c1: string;
    };
}): void;
