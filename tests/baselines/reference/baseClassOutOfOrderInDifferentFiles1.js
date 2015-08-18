//// [tests/cases/compiler/baseClassOutOfOrderInDifferentFiles1.ts] ////

//// [file1.ts]
// Different files - no --out
class B extends A { // no error
}

function foo() {
    class C extends A { // no error
    }
}

class D extends M.C { // no error
}

function foo2() {
    class C extends M.C { // no error
    }
}

//// [file2.ts]
class A {
}

module M {
    export class C {
    }
}

//// [file1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// Different files - no --out
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
function foo() {
    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        return C;
    })(A);
}
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(M.C);
function foo2() {
    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        return C;
    })(M.C);
}
//// [file2.js]
var A = (function () {
    function A() {
    }
    return A;
})();
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    M.C = C;
})(M || (M = {}));
