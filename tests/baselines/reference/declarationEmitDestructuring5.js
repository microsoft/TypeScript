//// [tests/cases/compiler/declarationEmitDestructuring5.ts] ////

//// [declarationEmitDestructuring5.ts]
function baz([, z, , ]) { }
function foo([, b, ]: [any, any]): void { }
function bar([z, , , ]) { }
function bar1([z, , , ] = [1, 3, 4, 6, 7]) { }
function bar2([,,z, , , ]) { }

//// [declarationEmitDestructuring5.js]
function baz(_a) {
    var _b;
    var z = (_b = (_a[0], _a[1]), _a[2], _b);
}
function foo(_a) {
    var b = (_a[0], _a[1]);
}
function bar(_a) {
    var _b;
    var z = (_b = _a[0], _a[1], _a[2], _b);
}
function bar1(_a) {
    var _b;
    var _c = _a === void 0 ? [1, 3, 4, 6, 7] : _a, z = (_b = _c[0], _c[1], _c[2], _b);
}
function bar2(_a) {
    var _b;
    var z = (_b = (_a[0], _a[1], _a[2]), _a[3], _a[4], _b);
}


//// [declarationEmitDestructuring5.d.ts]
declare function baz([, z, ,]: [any, any, any?]): void;
declare function foo([, b,]: [any, any]): void;
declare function bar([z, , ,]: [any, any?, any?]): void;
declare function bar1([z, , ,]?: [number, number, number, number, number]): void;
declare function bar2([, , z, , ,]: [any, any, any, any?, any?]): void;
