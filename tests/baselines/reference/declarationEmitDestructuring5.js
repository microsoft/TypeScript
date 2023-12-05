//// [tests/cases/compiler/declarationEmitDestructuring5.ts] ////

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
function foo(_a) {
    var b = _a[1];
}
function bar(_a) {
    var z = _a[0];
}
function bar1(_a) {
    var _b = _a === void 0 ? [1, 3, 4, 6, 7] : _a, z = _b[0];
}
function bar2(_a) {
    var z = _a[2];
}


//// [declarationEmitDestructuring5.d.ts]
declare function baz([, z, ,]: [any, any, any?]): void;
declare function foo([, b,]: [any, any]): void;
declare function bar([z, , ,]: [any, any?, any?]): void;
declare function bar1([z, , ,]?: [number, number, number, number, number]): void;
declare function bar2([, , z, , ,]: [any, any, any, any?, any?]): void;
