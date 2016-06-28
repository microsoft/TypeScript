//// [superAccessInFatArrow1.ts]
module test {
    export class A {
        foo() {
        }
    }
    export class B extends A {
        bar(callback: () => void ) {
        }
        runme() {
            this.bar(() => {
                super.foo();
            });
        }
    }
}

//// [superAccessInFatArrow1.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var test;
(function (test) {
    var A = (function () {
        function A() {
        }
        A.prototype.foo = function () {
        };
        return A;
    }());
    test.A = A;
    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        B.prototype.bar = function (callback) {
        };
        B.prototype.runme = function () {
            var _this = this;
            this.bar(function () {
                _super.prototype.foo.call(_this);
            });
        };
        return B;
    }(A));
    test.B = B;
})(test || (test = {}));
