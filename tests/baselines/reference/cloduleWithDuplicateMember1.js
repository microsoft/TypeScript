//// [cloduleWithDuplicateMember1.ts]
class C {
    get x() { return 1; }
    static get x() {
        return '';
    }
    static foo() { }
}

module C {
    export var x = 1;
}
module C {
    export function foo() { }
    export function x() { }
}

//// [cloduleWithDuplicateMember1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "x", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    C.foo = function () { };
    return C;
}());
(function (C) {
    C.x = 1;
})(C || (C = {}));
(function (C) {
    function foo() { }
    C.foo = foo;
    function x() { }
    C.x = x;
})(C || (C = {}));
