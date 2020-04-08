//// [selfReferencingSpreadInLoop.ts]
let additional = [];
for (const subcomponent of [1, 2, 3]) {
    additional = [...additional, subcomponent];
}


//// [selfReferencingSpreadInLoop.js]
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var additional = [];
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var subcomponent = _a[_i];
    additional = __spreadArrays(additional, [subcomponent]);
}
