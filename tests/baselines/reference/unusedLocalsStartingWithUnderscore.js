//// [a.ts]
import * as _ from "./a";

for (const _ of []) { }

for (const _ in []) { }

namespace _ns {
    let _;
    for (const _ of []) { }

    for (const _ in []) { }
}


//// [a.js]
"use strict";
exports.__esModule = true;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var _1 = _a[_i];
}
for (var _2 in []) { }
var _ns;
(function (_ns) {
    var _;
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _3 = _a[_i];
    }
    for (var _4 in []) { }
})(_ns || (_ns = {}));
