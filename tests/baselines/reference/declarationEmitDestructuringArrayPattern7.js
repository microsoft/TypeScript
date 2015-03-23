//// [declarationEmitDestructuringArrayPattern7.ts]
function bar([x, z, ...w]) { }
function foo([x, ...y] = [1, "string", true]) { }

//// [declarationEmitDestructuringArrayPattern7.js]
function bar(_a) {
    var x = _a[0], z = _a[1], w = _a.slice(2);
}
function foo(_a) {
    var _b = _a === void 0 ? [
        1,
        "string",
        true
    ] : _a, x = _b[0], y = _b.slice(1);
}


//// [declarationEmitDestructuringArrayPattern7.d.ts]
declare function bar([x, z, w]: any[]): void;
declare function foo([x, y]?: (string | number | boolean)[]): void;
