//// [unusedLocalsStartingWithUnderscore.ts]
for (const _ of []) { }

for (const _ in []) { }

namespace M {
    let _;
    for (const _ of []) { }

    for (const _ in []) { }
}
    

//// [unusedLocalsStartingWithUnderscore.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var _ = _a[_i];
}
for (var _ in []) { }
var M;
(function (M) {
    var _;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _1 = _a[_i];
    }
    for (var _2 in []) { }
})(M || (M = {}));
