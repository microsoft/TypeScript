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
    "use strict";
}
var A = (function () {
    function A() {
    }
    A.prototype.m = function () {
        "use strict";
        var _this = this;
        var v = function () {
            return _this.n();
        };
    };
    A.prototype.n = function () {
    };
    return A;
})();
function bar(x) {
    "use strict";
    if (x === void 0) { x = 10; }
}
