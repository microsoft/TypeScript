//// [tests/cases/compiler/declarationEmitDestructuring3.ts] ////

//// [declarationEmitDestructuring3.ts]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }



//// [declarationEmitDestructuring3.js]
function bar(_a) {
    var x = _a[0], z = _a[1], w = _a.slice(2);
}
function foo(_a) {
    var _b = _a === void 0 ? [1, "string", true] : _a, x = _b[0], y = _b.slice(1);
}


//// [declarationEmitDestructuring3.d.ts]
declare function bar([x, z, ...w]: [any, any, ...any[]]): void;
declare function foo([x, ...y]?: [number, string, boolean]): void;
