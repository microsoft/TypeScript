//// [tests/cases/compiler/localClassesInLoop.ts] ////

//// [localClassesInLoop.ts]
declare function use(a: any);

"use strict"
var data = [];
for (let x = 0; x < 2; ++x) {
    class C { }
    data.push(() => C);
}

use(data[0]() === data[1]());

//// [localClassesInLoop.js]
"use strict";
var data = [];
var _loop_1 = function (x) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    data.push(function () { return C; });
};
for (var x = 0; x < 2; ++x) {
    _loop_1(x);
}
use(data[0]() === data[1]());
