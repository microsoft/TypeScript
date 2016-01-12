//// [superCallInsideClassExpression.ts]
class A {
}

class C {
}

class B extends A {
    constructor() {

        var D = class extends C {
            constructor() {
                super();
            }
        }
    }
}

//// [superCallInsideClassExpression.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var C = (function () {
    function C() {
    }
    return C;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var D = (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                _super.call(this);
            }
            return class_1;
        }(C));
    }
    return B;
}(A));
