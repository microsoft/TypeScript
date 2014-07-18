//// [strictMode5.ts]
function foo(...args) {
    "use strict"
}

class A {
    m() {
        "use strict"

        var v = () => {
            return this.n();
        };
    }
    n() {}
}

function bar(x: number = 10) {
    "use strict"
}

//// [strictMode5.js]
function foo() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    "use strict";
}
var A = (function () {
    function A() {
    }
    A.prototype.m = function () {
        var _this = this;
        "use strict";
        var v = function () {
            return _this.n();
        };
    };
    A.prototype.n = function () {
    };
    return A;
})();
function bar(x) {
    if (x === void 0) { x = 10; }
    "use strict";
}
