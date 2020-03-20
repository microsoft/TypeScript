//// [declarationEmitDestructuring5.ts]
function baz([, z, , ]) { }
function foo([, b, ]: [any, any]): void { }
function bar([z, , , ]) { }
function bar1([z, , , ] = [1, 3, 4, 6, 7]) { }
function bar2([,,z, , , ]) { }

//// [declarationEmitDestructuring5.js]
function baz(_a) {
    var z = _a[1];
}
function foo(_b) {
    var b = _b[1];
}
function bar(_c) {
    var z = _c[0];
}
function bar1(_d) {
    var _e = _d === void 0 ? [1, 3, 4, 6, 7] : _d, z = _e[0];
}
function bar2(_f) {
    var z = _f[2];
}


//// [declarationEmitDestructuring5.d.ts]
declare function baz([, z, ,]: [any, any, any?]): void;
declare function foo([, b,]: [any, any]): void;
declare function bar([z, , ,]: [any, any?, any?]): void;
declare function bar1([z, , ,]?: [number, number, number, number, number]): void;
declare function bar2([, , z, , ,]: [any, any, any, any?, any?]): void;
