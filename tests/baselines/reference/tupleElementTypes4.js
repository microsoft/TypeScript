//// [tupleElementTypes4.ts]
function f([a, b] = [0, undefined]) { }

//// [tupleElementTypes4.js]
function f(_a) {
    var _b = _a === void 0 ? [0, undefined] : _a, a = _b[0], b = _b[1];
}
