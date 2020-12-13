//// [downlevelIterableString.ts]
function testString(name: string) {
    for (const _char of [...name]) {
    }
}


//// [downlevelIterableString.js]
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function testString(name) {
    for (var _i = 0, _a = __spreadArrays(name); _i < _a.length; _i++) {
        var _char = _a[_i];
    }
}
