//// [superCallInsideObjectLiteralExpression.ts]
class A {
    foo() {
    }
}

class B extends A {
    constructor() {
        var x = {
            x: super()
        }
    }
}

//// [superCallInsideObjectLiteralExpression.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
    };
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        var x = {
            x: _super.call(this)
        };
    }
    return B;
}(A));
