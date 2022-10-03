//// [selfReferencingSpreadInLoop.ts]
let additional = [];
for (const subcomponent of [1, 2, 3]) {
    additional = [...additional, subcomponent];
}


//// [selfReferencingSpreadInLoop.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var additional = [];
for (var _i = 0, _a = [1, 2, 3]; _i < _a.length; _i++) {
    var subcomponent = _a[_i];
    additional = __spreadArray(__spreadArray([], additional, true), [subcomponent], false);
}
