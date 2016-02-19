//// [superCallInsideClassDeclaration.ts]
class A {
}

class C {
}

class B extends A {
    constructor() {

        class D extends C {
            constructor() {
                super();
            }
        }
    }
}

//// [superCallInsideClassDeclaration.js]
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
            __extends(D, _super);
            function D() {
                _super.call(this);
            }
            return D;
        }(C));
    }
    return B;
}(A));
