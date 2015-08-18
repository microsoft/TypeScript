//// [baseClassOutOfOrderInModule.ts]
module M {
    export class A {
    }
}

class C1 extends M.A { // no error
}

class C2 extends M.B { // error
}

function foo2() {
    class C3 extends M.A { // no error
    }

    class C4 extends M.B { // no error
    }
}

module M {
    export class B {
    }
}

//// [baseClassOutOfOrderInModule.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var M;
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    M.A = A;
})(M || (M = {}));
var C1 = (function (_super) {
    __extends(C1, _super);
    function C1() {
        _super.apply(this, arguments);
    }
    return C1;
})(M.A);
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(M.B);
function foo2() {
    var C3 = (function (_super) {
        __extends(C3, _super);
        function C3() {
            _super.apply(this, arguments);
        }
        return C3;
    })(M.A);
    var C4 = (function (_super) {
        __extends(C4, _super);
        function C4() {
            _super.apply(this, arguments);
        }
        return C4;
    })(M.B);
}
var M;
(function (M) {
    var B = (function () {
        function B() {
        }
        return B;
    })();
    M.B = B;
})(M || (M = {}));
