//// [selfReferencingSpreadInLoop.ts]
let additional = [];
for (const subcomponent of [1, 2, 3]) {
    additional = [...additional, subcomponent];
}


//// [selfReferencingSpreadInLoop.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var additional = [];
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var subcomponent = _a[_i];
    additional = __spreadArray(__spreadArray([], additional), [subcomponent]);
}
